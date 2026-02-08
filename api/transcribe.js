const formidable = require("formidable");
const { readFileSync } = require("fs");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OpenAI API key not configured" });
    return;
  }

  try {
    // Parse multipart upload with formidable
    const form = formidable({ maxFileSize: 25 * 1024 * 1024 });
    const [fields, files] = await form.parse(req);

    const file = files.file?.[0];
    if (!file) {
      res.status(400).json({ error: "No audio file provided" });
      return;
    }

    // Read the uploaded file and construct FormData for OpenAI
    const fileBuffer = readFileSync(file.filepath);
    const blob = new Blob([fileBuffer], { type: file.mimetype || "audio/webm" });

    const formData = new FormData();
    formData.append("file", blob, file.originalFilename || "recording.webm");
    formData.append("model", fields.model?.[0] || "whisper-1");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      res.status(response.status).json({ error: errText });
      return;
    }

    const data = await response.json();
    res.status(200).json({ text: data.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.config = { api: { bodyParser: false } };
