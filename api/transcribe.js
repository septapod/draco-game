// Parse multipart form data from raw request body (no dependency needed)
function parseMultipart(buf, boundary) {
  const parts = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  let start = buf.indexOf(boundaryBuf) + boundaryBuf.length;

  while (start < buf.length) {
    // Skip CRLF after boundary
    if (buf[start] === 0x0d) start += 2;
    else if (buf[start] === 0x0a) start += 1;

    // Check for closing boundary
    if (buf[start] === 0x2d && buf[start + 1] === 0x2d) break;

    // Find end of headers (double CRLF)
    const headerEnd = buf.indexOf('\r\n\r\n', start);
    if (headerEnd === -1) break;
    const headers = buf.slice(start, headerEnd).toString();

    // Find next boundary
    const bodyStart = headerEnd + 4;
    const nextBoundary = buf.indexOf(boundaryBuf, bodyStart);
    if (nextBoundary === -1) break;

    // Body is everything up to CRLF before boundary
    const bodyEnd = nextBoundary - 2;
    const body = buf.slice(bodyStart, bodyEnd);

    // Parse headers for name, filename, content-type
    const nameMatch = headers.match(/name="([^"]+)"/);
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    const ctMatch = headers.match(/Content-Type:\s*(.+)/i);

    parts.push({
      name: nameMatch ? nameMatch[1] : '',
      filename: filenameMatch ? filenameMatch[1] : null,
      contentType: ctMatch ? ctMatch[1].trim() : null,
      data: body,
    });

    start = nextBoundary + boundaryBuf.length;
  }
  return parts;
}

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
    // Read raw body
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buf = Buffer.concat(chunks);

    // Extract boundary from content-type header
    const ct = req.headers["content-type"] || "";
    const boundaryMatch = ct.match(/boundary=(.+)/);
    if (!boundaryMatch) {
      res.status(400).json({ error: "Missing multipart boundary" });
      return;
    }

    const parts = parseMultipart(buf, boundaryMatch[1]);
    const filePart = parts.find(p => p.name === "file");
    if (!filePart || !filePart.data.length) {
      res.status(400).json({ error: "No audio file provided" });
      return;
    }

    const modelPart = parts.find(p => p.name === "model");
    const model = modelPart ? modelPart.data.toString() : "whisper-1";
    const filename = filePart.filename || "recording.webm";
    const mimetype = filePart.contentType || "audio/webm";

    // Build FormData for OpenAI using Node 18+ built-in globals
    const { File } = require("node:buffer");
    const audioFile = new File([filePart.data], filename, { type: mimetype });
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", model);

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Whisper API error:", response.status, errText);
      res.status(response.status).json({ error: errText });
      return;
    }

    const data = await response.json();
    res.status(200).json({ text: data.text });
  } catch (err) {
    console.error("Transcription handler error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.config = { api: { bodyParser: false } };
