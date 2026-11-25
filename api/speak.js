const { renderVoice } = require('./_realtime-voice');
const { requireAuth } = require('./auth');
const { meterGuest } = require('./_passes');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAuth(req, res)) return;

  const text = req.body?.text;
  if (typeof text !== 'string' || !text.trim() || text.length > 3500) {
    return res.status(400).json({ error: 'Narration text is required' });
  }
  if (process.env.DRACO_OPENAI_ZDR !== 'verified') {
    return res.status(503).json({ error: 'OpenAI narrator voice is unavailable' });
  }
  if (!(await meterGuest(req, res, 'speaks'))) return;

  const controller = new AbortController();
  res.once('close', () => controller.abort());
  try {
    const audio = await renderVoice(text.trim(), controller.signal);
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Length', audio.length);
    res.end(audio);
  } catch (error) {
    if (controller.signal.aborted) return;
    console.error('OpenAI voice unavailable:', error.status || error.message, error.code || '');
    res.status(error.status === 429 ? 429 : 502).json({ error: 'OpenAI narrator voice is unavailable' });
  }
};
