const formidable = require("formidable");
const { readFileSync } = require("fs");
const { basename } = require("path");

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

    // Read the uploaded file
    const fileBuffer = readFileSync(file.filepath);
    const filename = file.originalFilename || "recording.webm";
    const mimetype = file.mimetype || "audio/webm";
    const model = fields.model?.[0] || "whisper-1";

    // Build multipart/form-data manually (avoids Blob/FormData compat issues)
    const boundary = "----WhisperBoundary" + Date.now();
    const parts = [];

    // File part
    parts.push(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n` +
      `Content-Type: ${mimetype}\r\n\r\n`
    );
    parts.push(fileBuffer);
    parts.push("\r\n");

    // Model part
    parts.push(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="model"\r\n\r\n` +
      `${model}\r\n`
    );

    parts.push(`--${boundary}--\r\n`);

    // Combine into a single Buffer
    const body = Buffer.concat(
      parts.map(p => typeof p === "string" ? Buffer.from(p) : p)
    );

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
      body,
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
