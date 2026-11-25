const { streamStory } = require('./_openai-story');
const Anthropic = require("@anthropic-ai/sdk");
const { requireAuth } = require("./auth");
const { meterGuest } = require("./_passes");

const ALLOWED_MODELS = new Set([
  "claude-haiku-4-5-20251001",
  "claude-sonnet-4-6",
  "claude-opus-4-8",
]);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!requireAuth(req, res)) return;

  const { system = '', messages, purpose, model } = req.body || {};
  const summary = purpose === 'summary' || model === 'claude-haiku-4-5-20251001';
  if (typeof system !== 'string' || system.length > 150000 || !Array.isArray(messages) ||
      !messages.length || messages.length > 64 || !messages.every(validMessage)) {
    return res.status(400).json({ error: 'Valid story messages are required' });
  }
  if (!(await meterGuest(req, res, 'turns'))) return;

  const useOpenAI = process.env.DRACO_OPENAI_ZDR === 'verified';
  const legacyModel = ALLOWED_MODELS.has(model) ? model
    : summary ? 'claude-haiku-4-5-20251001' : 'claude-sonnet-4-6';
  const send = event => res.write(`data: ${JSON.stringify(event)}\n\n`);

  // Stream response via SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Wrap system prompt in content block with cache_control for prompt caching.
  // The Game Bible (~15K tokens) is identical across turns — caching reduces
  // input cost by ~90% (cache reads are 0.1x base price).
  const systemBlocks = system
    ? [{ type: "text", text: system, cache_control: { type: "ephemeral" } }]
    : undefined;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 40000);
  res.once('close', () => controller.abort());
  try {
    if (useOpenAI) {
      await streamStory({ system, messages, summary }, send, controller.signal);
      res.end();
      return;
    }
    // Keep the current story service available while the OpenAI project is configured.
    const client = new Anthropic();
    const stream = await client.messages.stream({
      model: legacyModel,
      system: systemBlocks,
      messages,
      max_tokens: summary ? 2048 : 500,
    }, { signal: controller.signal });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    const finalMessage = await stream.finalMessage();
    send({ done: true, stopReason: finalMessage.stop_reason, model: legacyModel });
    res.end();
  } catch (error) {
    if (res.destroyed || res.writableEnded) return;
    console.error('Story service unavailable:', error.status || error.name, error.code || '');
    if (res.headersSent) {
      send({ error: 'The story service is unavailable' });
      res.end();
    } else {
      res.status(error.status === 429 ? 429 : 502).json({ error: 'The story service is unavailable' });
    }
  } finally {
    clearTimeout(timeout);
  }
};

function validMessage(message) {
  if (!message || !['user', 'assistant'].includes(message.role)) return false;
  const content = message.content;
  if (typeof content === 'string') return content.length <= 32000;
  return Array.isArray(content) && content.length <= 64 &&
    content.every(part => part?.type === 'text' && typeof part.text === 'string' && part.text.length <= 32000);
}
