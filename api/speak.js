module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ElevenLabs API key not configured" });
    return;
  }

  try {
    const { text, voice_id } = req.body;
    if (!text) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    // George — warm British male storyteller, great for fantasy narration
    const voiceId = voice_id || "JBFqnCBsd6RMkjVDRZzb";

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
            style: 0.4,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("ElevenLabs API error:", response.status, errText);
      res.status(response.status).json({ error: errText });
      return;
    }

    // Collect the full audio response as a buffer
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", audioBuffer.length);
    res.end(audioBuffer);
  } catch (err) {
    console.error("TTS handler error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
};
