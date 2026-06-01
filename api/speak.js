const { requireAuth } = require("./auth");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!requireAuth(req, res)) return;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OpenAI API key not configured" });
    return;
  }

  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "No text provided" });
      return;
    }

    // OpenAI TTS has a 4096 character limit
    const truncated = text.length > 4096 ? text.slice(0, 4096) : text;

    const response = await fetch(
      "https://api.openai.com/v1/audio/speech",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "tts-1",
          voice: "nova",
          input: truncated,
          response_format: "mp3",
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI TTS API error:", response.status, errText);
      res.status(response.status).json({ error: errText });
      return;
    }

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Transfer-Encoding", "chunked");

    const reader = response.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    } catch (streamErr) {
      console.error("TTS stream error:", streamErr);
      try { res.end(); } catch (_) {}
    }
  } catch (err) {
    console.error("TTS handler error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      try { res.end(); } catch (_) {}
    }
  }
};
