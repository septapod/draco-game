const MODEL = 'gpt-6.2-sol';

async function streamStory({ system, messages, summary }, send, signal) {
  const input = system ? [{ role: 'developer', content: system }] : [];
  for (const { role, content } of messages) {
    const text = Array.isArray(content) ? content.map(part => part.text).join('') : content;
    if (text.trim()) input.push({ role, content: text });
  }
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
      'Content-Type': 'application/json',
    },
    signal,
    body: JSON.stringify({
      model: MODEL,
      input,
      store: false,
      stream: true,
      reasoning: { effort: 'low' },
      text: { verbosity: 'low' },
      // Include room for reasoning, narration, and the game-state updates.
      max_output_tokens: summary ? 4096 : 2048,
    }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw Object.assign(new Error('OpenAI story request failed'), {
      status: response.status, code: payload?.error?.code,
    });
  }
  const decoder = new TextDecoder();
  let buffer = '';
  let hasText = false;
  for await (const chunk of response.body) {
    buffer += decoder.decode(chunk, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      const event = JSON.parse(data);
      if (event.type === 'response.output_text.delta' && event.delta) {
        hasText = true;
        send({ text: event.delta });
      }
      if (event.type === 'response.completed' && hasText) {
        send({ done: true, stopReason: 'end_turn', model: event.response.model });
        return;
      }
      if (['response.incomplete', 'response.failed', 'error'].includes(event.type)) {
        const code = event.response?.error?.code || event.response?.incomplete_details?.reason || event.error?.code || event.code;
        const status = ['rate_limit_exceeded', 'credit_balance_exhausted', 'insufficient_quota'].includes(code) ? 429 : 502;
        throw Object.assign(new Error('OpenAI story reply was incomplete'), { status, code });
      }
    }
  }
  throw new Error('OpenAI story stream ended without a completed reply');
}

module.exports = { streamStory };
