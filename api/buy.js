// Redirects to the Stripe Payment Link for an Adventure Pass.
// Keeping the link in an env var means the static login page never needs
// editing when the product or price changes.

module.exports = async function handler(req, res) {
  const link = process.env.STRIPE_PAYMENT_LINK;
  if (!link) {
    res.status(500).json({ error: 'STRIPE_PAYMENT_LINK not configured' });
    return;
  }
  res.statusCode = 302;
  res.setHeader('Location', link);
  res.end();
};
