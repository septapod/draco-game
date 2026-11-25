// Adventure Pass claim endpoint.
//
// Stripe Payment Link is configured (in the Stripe dashboard) to redirect
// here after payment: /api/claim?session_id={CHECKOUT_SESSION_ID}
//
// We verify the Checkout session directly with Stripe's API (no webhook,
// no stripe npm dependency), create or look up the pass in Neon, set the
// signed guest cookie, and drop the player into the game. Revisiting the
// success URL re-issues the cookie while the pass is still valid, so a
// buyer who clears cookies or switches devices isn't locked out.

const { setSession } = require('./auth');
const { redeemPass, PASS_DAYS } = require('./_passes');

function fail(res, code) {
  res.statusCode = 302;
  res.setHeader('Location', '/login.html?error=' + encodeURIComponent(code));
  res.end();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey || !process.env.DATABASE_URL) {
    res.status(500).json({ error: 'Pass system not configured' });
    return;
  }

  const sessionId = typeof req.query?.session_id === 'string' ? req.query.session_id : '';
  // Checkout session ids look like cs_live_... / cs_test_...
  if (!/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
    fail(res, 'pass_invalid');
    return;
  }

  try {
    // Verify the payment with Stripe. Retrieving with our secret key also
    // proves the session belongs to our account.
    const stripeResp = await fetch(
      'https://api.stripe.com/v1/checkout/sessions/' + encodeURIComponent(sessionId),
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );

    if (!stripeResp.ok) {
      console.error('Stripe session lookup failed:', stripeResp.status, await stripeResp.text());
      fail(res, 'pass_invalid');
      return;
    }

    const session = await stripeResp.json();
    if (session.payment_status !== 'paid') {
      fail(res, 'pass_unpaid');
      return;
    }

    const result = await redeemPass(sessionId);
    if (!result.ok) {
      fail(res, 'pass_expired');
      return;
    }

    // Guest cookie lifetime matches the pass window.
    setSession(res, 'guest:' + sessionId, 60 * 60 * 24 * PASS_DAYS);
    res.statusCode = 302;
    res.setHeader('Location', '/game/');
    res.end();
  } catch (err) {
    console.error('Claim error:', err);
    fail(res, 'pass_error');
  }
};
