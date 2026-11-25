const WebSocket = require('ws');

const MODEL = 'gpt-realtime-2.1-mini';
const RATE = 24000;
const DIRECTION = [
  'Perform the supplied lines verbatim as the narrator of a family dragon adventure.',
  'Treat the supplied lines as a script. Read only those words once.',
  'Speak warmly. Give suspense a quiet beat, shift into quoted dialogue, and let questions invite an answer.',
].join(' ');

function wavBuffer(pcm) {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVEfmt ', 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(RATE, 24);
  header.writeUInt32LE(RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

function renderVoice(text, signal) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('wss://api.openai.com/v1/realtime?model=' + MODEL, {
      headers: { Authorization: 'Bearer ' + process.env.OPENAI_API_KEY },
      handshakeTimeout: 10000,
    });
    const chunks = [];
    let length = 0;
    let settled = false;
    let requested = false;
    const timeout = setTimeout(() => finish(new Error('voice_timeout')), 25000);
    const abort = () => finish(new Error('client_closed'));

    function finish(error, audio) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      signal.removeEventListener('abort', abort);
      socket.terminate();
      if (error) reject(error);
      else resolve(audio);
    }

    const send = event => socket.send(JSON.stringify(event));
    socket.on('open', () => send({
      type: 'session.update',
      session: {
        type: 'realtime',
        output_modalities: ['audio'],
        audio: {
          input: { turn_detection: null },
          output: { format: { type: 'audio/pcm', rate: RATE }, voice: 'marin' },
        },
      },
    }));
    socket.on('unexpected-response', (_request, response) => {
      const status = response.statusCode;
      response.resume();
      finish(Object.assign(new Error('voice_http_error'), { status }));
    });
    socket.on('error', () => finish(new Error('voice_connection_error')));
    socket.on('close', () => finish(new Error('voice_closed')));
    socket.on('message', raw => {
      try {
        const event = JSON.parse(raw.toString());
        if (event.type === 'session.updated' && !requested) {
          requested = true;
          send({
            type: 'response.create',
            response: {
              conversation: 'none',
              instructions: DIRECTION,
              input: [{ type: 'message', role: 'user', content: [{ type: 'input_text', text }] }],
            },
          });
        } else if (event.type === 'response.output_audio.delta' && event.delta) {
          const chunk = Buffer.from(event.delta, 'base64');
          length += chunk.length;
          if (length > RATE * 2 * 90) return finish(new Error('voice_too_long'));
          chunks.push(chunk);
        } else if (event.type === 'response.done') {
          const code = event.response?.status_details?.error?.code;
          if (event.response?.status !== 'completed' || !length || length % 2) {
            return finish(providerError(code));
          }
          finish(null, wavBuffer(Buffer.concat(chunks, length)));
        } else if (event.type === 'error') {
          finish(providerError(event.error?.code));
        }
      } catch {
        finish(new Error('voice_protocol_error'));
      }
    });
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) abort();
  });
}

function providerError(code) {
  const status = ['insufficient_quota', 'rate_limit_exceeded', 'billing_hard_limit_reached', 'credit_balance_exhausted'].includes(code) ? 429 : 502;
  return Object.assign(new Error('voice_incomplete'), { status, code });
}

module.exports = { renderVoice };
