// Adventure Pass helpers — shared by claim.js, chat.js, speak.js, transcribe.js.
// Underscore prefix keeps Vercel from treating this as an endpoint.
//
// A pass is created when a Stripe Checkout payment is verified (api/claim.js)
// and grants a time-boxed, usage-capped guest session. Usage is metered
// per-endpoint with atomic UPDATEs so a scripted client can't blow past caps.

const { neon } = require('@neondatabase/serverless');

// Caps per pass. Chat turns are the real cost driver; speak/transcribe caps
// are generous ceilings that only matter if someone hammers those endpoints
// directly. Overridable via env without a redeploy of intent.
const PASS_DAYS = parseInt(process.env.PASS_DAYS || '7', 10);
const PASS_TURN_LIMIT = parseInt(process.env.PASS_TURN_LIMIT || '120', 10);
const PASS_SPEAK_LIMIT = parseInt(process.env.PASS_SPEAK_LIMIT || '400', 10);
const PASS_TRANSCRIBE_LIMIT = parseInt(process.env.PASS_TRANSCRIBE_LIMIT || '400', 10);

const LIMITS = {
  turns: PASS_TURN_LIMIT,
  speaks: PASS_SPEAK_LIMIT,
  transcribes: PASS_TRANSCRIBE_LIMIT,
};

function getSQL() {
  return neon(process.env.DATABASE_URL);
}

async function ensurePassTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS passes (
      id TEXT PRIMARY KEY,
      turns_used INTEGER DEFAULT 0,
      speaks_used INTEGER DEFAULT 0,
      transcribes_used INTEGER DEFAULT 0,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}

// Create a pass for a verified Stripe Checkout session, or return the
// existing one if the buyer revisits the success URL (new device, cleared
// cookies). Expired passes are not renewable.
// Returns { ok: true } or { ok: false, reason: 'expired' }.
async function redeemPass(checkoutSessionId) {
  const sql = getSQL();
  await ensurePassTable(sql);

  const rows = await sql`
    INSERT INTO passes (id, expires_at)
    VALUES (${checkoutSessionId}, now() + make_interval(days => ${PASS_DAYS}))
    ON CONFLICT (id) DO UPDATE SET id = passes.id
    RETURNING expires_at
  `;
  const expiresAt = new Date(rows[0].expires_at);
  if (expiresAt.getTime() < Date.now()) return { ok: false, reason: 'expired' };
  return { ok: true };
}

// Atomically consume one unit of usage ('turns' | 'speaks' | 'transcribes').
// Returns { ok: true, remaining } or { ok: false, reason: 'pass_expired' | 'pass_exhausted' | 'pass_missing' }.
async function consumePassUnit(session, kind) {
  const passId = session.slice('guest:'.length);
  const limit = LIMITS[kind];
  const sql = getSQL();
  await ensurePassTable(sql);

  const column = { turns: 'turns_used', speaks: 'speaks_used', transcribes: 'transcribes_used' }[kind];
  // sql`` can't parameterize identifiers; column comes from the fixed map above.
  const rows = await sql.query(
    `UPDATE passes
     SET ${column} = ${column} + 1
     WHERE id = $1 AND expires_at > now() AND ${column} < $2
     RETURNING ${column} AS used`,
    [passId, limit]
  );

  if (rows.length > 0) return { ok: true, remaining: limit - rows[0].used };

  // Denied — figure out why so the player gets an honest message.
  const check = await sql`SELECT expires_at FROM passes WHERE id = ${passId}`;
  if (check.length === 0) return { ok: false, reason: 'pass_missing' };
  if (new Date(check[0].expires_at).getTime() < Date.now()) return { ok: false, reason: 'pass_expired' };
  return { ok: false, reason: 'pass_exhausted' };
}

const PASS_ERROR_MESSAGES = {
  pass_exhausted: 'Your Adventure Pass is complete. Thanks for playing in Draco’s world! Grab another pass to keep adventuring.',
  pass_expired: 'Your Adventure Pass has expired. Grab a new pass to keep adventuring.',
  pass_missing: 'Your Adventure Pass could not be found. Please log in or buy a new pass.',
};

// Meters a guest request. Sends a 403 and returns false if the pass is
// spent, expired, or missing; returns true (possibly without metering,
// for family sessions) otherwise.
async function meterGuest(req, res, kind) {
  if (!req.userId || !req.userId.startsWith('guest:')) return true;
  const result = await consumePassUnit(req.userId, kind);
  if (result.ok) return true;
  res.status(403).json({ error: PASS_ERROR_MESSAGES[result.reason], code: result.reason });
  return false;
}

module.exports = { redeemPass, consumePassUnit, meterGuest, PASS_DAYS, PASS_TURN_LIMIT };
