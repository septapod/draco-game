// Shared auth utilities for Draco API routes
// Auth is a simple shared password with a signed session cookie.
// No public signup. Brent adds users manually (or shares the password).

const crypto = require('crypto');

const COOKIE_NAME = 'draco_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

function getSecret() {
  const secret = process.env.DRACO_SECRET;
  if (!secret) throw new Error('DRACO_SECRET not configured');
  return secret;
}

function sign(value) {
  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(value);
  return value + '.' + hmac.digest('base64url');
}

function verify(signed) {
  const dot = signed.lastIndexOf('.');
  if (dot === -1) return null;
  const value = signed.slice(0, dot);
  if (sign(value) === signed) return value;
  return null;
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  const cookies = {};
  header.split(';').forEach(pair => {
    const [k, ...v] = pair.trim().split('=');
    if (k) cookies[k] = decodeURIComponent(v.join('='));
  });
  return cookies;
}

// Returns the session value if authenticated, null otherwise
function getSession(req) {
  const cookies = parseCookies(req);
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  return verify(token);
}

// Sets the session cookie on the response.
// maxAge (seconds) defaults to 90 days; guest passes use a shorter window.
function setSession(res, value, maxAge = COOKIE_MAX_AGE) {
  const signed = sign(value);
  res.setHeader('Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(signed)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Secure`
  );
}

// Guest sessions come from paid Adventure Passes (see api/claim.js).
// Session value format: "guest:<stripe_checkout_session_id>"
function isGuest(session) {
  return typeof session === 'string' && session.startsWith('guest:');
}

// Middleware: returns true if authenticated, sends 401 and returns false if not
function requireAuth(req, res) {
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return false;
  }
  req.userId = session;
  return true;
}

module.exports = { getSession, setSession, requireAuth, parseCookies, isGuest, COOKIE_NAME };
