const { streamTosca } = require('./_tosca-voice');
const { requireAuth } = require('./auth');
const { meterGuest } = require('./_passes');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAuth(req, res)) return;

  const text = req.body?.text;
  if (typeof text !== 'string' || !text.trim() || text.length > 3500) {
    return res.status(400).json({ error: 'Narration text is required' });
  }
  const apiKey = (process.env.DRACO_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY)?.trim();
  if (!apiKey) {
    return res.status(503).json({ error: 'Narrator voice is unavailable' });
  }
  if (!(await meterGuest(req, res, 'speaks'))) return;

  const pcm = req.headers.accept === 'audio/pcm';
  const controller = new AbortController();
  res.once('close', () => controller.abort());
  try {
    await streamTosca(text.trim(), apiKey, pcm ? 'pcm_24000' : 'mp3_44100_128', controller.signal, chunk => {
      if (!res.headersSent) {
        res.setHeader('Content-Type', pcm ? 'audio/pcm' : 'audio/mpeg');
        res.setHeader('Cache-Control', 'no-store, no-transform');
      }
      res.write(chunk);
    });
    res.end();
  } catch (error) {
    if (controller.signal.aborted) return;
    console.error('ElevenLabs voice unavailable:', error.status || error.message);
    if (res.headersSent) return res.destroy();
    res.status(error.status === 429 ? 429 : 502).json({ error: 'Narrator voice is unavailable' });
  }
};
