const WebSocket = require('ws');

const VOICE_ID = 'fNmw8sukfGuvWVOp33Ge';
const URL = 'wss://api.elevenlabs.io/v1/text-to-dialogue/stream-input' +
  '?model_id=eleven_v4_turbo&language_code=en';

function streamTosca(text, apiKey, format, signal, onAudio) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(URL + '&output_format=' + format, {
      headers: { 'xi-api-key': apiKey },
      handshakeTimeout: 10000,
    });
    const timeout = setTimeout(() => finish(new Error('voice_timeout')), 25000);
    let settled = false;
    let hasAudio = false;
    const abort = () => finish(new Error('client_closed'));

    function finish(error) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      signal.removeEventListener('abort', abort);
      socket.terminate();
      if (error) reject(error);
      else resolve();
    }

    const send = data => socket.send(JSON.stringify(data));
    socket.on('open', () => {
      send({ voices: [VOICE_ID] });
      send({ inputs: [{ voice_id: VOICE_ID, text: '[British accent] ' + text }] });
      send({ close_socket: true });
    });
    socket.on('message', raw => {
      try {
        const event = JSON.parse(raw.toString());
        if (event.error) return finish(new Error('voice_provider_error'));
        if (event.audio) {
          const chunk = Buffer.from(event.audio, 'base64');
          if (chunk.length) {
            hasAudio = true;
            onAudio(chunk);
          }
        }
        if (event.is_final) finish(hasAudio ? null : new Error('voice_empty'));
      } catch (error) {
        finish(error);
      }
    });
    socket.on('unexpected-response', (_req, response) => {
      response.resume();
      finish(Object.assign(new Error('voice_http_error'), { status: response.statusCode }));
    });
    socket.on('error', () => finish(new Error('voice_connection_error')));
    socket.on('close', () => finish(new Error('voice_closed')));
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) abort();
  });
}

module.exports = { streamTosca };
