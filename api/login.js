const { setSession } = require('./auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { password } = req.body;
  const expected = process.env.DRACO_PASSWORD;

  if (!expected) {
    res.status(500).json({ error: 'DRACO_PASSWORD not configured' });
    return;
  }

  if (!password || password !== expected) {
    res.status(403).json({ error: 'Wrong password' });
    return;
  }

  // Session value is just "family" for now (single household).
  // If you add individual users later, this becomes a user ID.
  setSession(res, 'family');
  res.json({ ok: true });
};
