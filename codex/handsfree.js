// Audio is recognized locally. A finished reply reaches the normal Send path while hands-free is listening.
// Speaker audio may precede the interruption cue.
const storyWakePhrase = /\bhey story\b/i;

class HandsFreePlay {
  constructor(game) {
    this.game = game;
    this.button = document.getElementById('btn-handsfree');
    this.status = document.getElementById('handsfree-status');
    this.input = document.getElementById('input-message');
    this.level = document.getElementById('handsfree-level');
    this.session = null;
    this.engineScript = null;
    this.worklets = new WeakMap();
    this.button.addEventListener('click', () => {
      if (this.session) this.stop('Microphone off.');
      else this.start();
    });
    window.addEventListener('pagehide', () => this.stop());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
    });
  }

  setStatus(text) {
    if (this.status.textContent !== text) this.status.textContent = text;
  }

  loadEngine() {
    if (!this.engineScript) {
      this.engineScript = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/speech/vosk-0.0.8.js';
        script.onload = resolve;
        script.onerror = () => {
          this.engineScript = null;
          script.remove();
          reject(new Error('download'));
        };
        document.head.append(script);
      });
    }
    return this.engineScript;
  }

  async start() {
    if (!this.game.state || this.session) return;
    if (!window.isSecureContext || !window.AudioWorkletNode || !navigator.mediaDevices?.getUserMedia) {
      this.setStatus('Use the mic button or type a move on this browser.');
      return;
    }
    const names = this.game.state.players.map(player => player.name.toLowerCase());
    if (new Set(names).size < names.length) {
      this.setStatus('These Keepers share a name. Use Hold to talk or type your team’s move.');
      return;
    }
    if (this.game.manualMicBusy?.() || this.input.value.trim()) {
      this.setStatus('Finish your current move before starting hands-free.');
      return;
    }
    const session = { adventure: this.game.state, model: null, stream: null, recognizer: null };
    this.session = session;
    this.button.setAttribute('aria-checked', 'true');
    this.setStatus('Allow microphone access to start Hands-free.');
    document.getElementById('btn-mic').disabled = true;
    try {
      this.game.unlockAudio(); // Keep the user activation on iOS.
      const context = this.game.audioContext;
      if (!context.audioWorklet) throw new Error('unsupported');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });
      if (this.session !== session) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      session.stream = stream;
      stream.getAudioTracks()[0].addEventListener('ended', () => {
        if (this.session === session) this.stop('Microphone disconnected. Tap Hands-free to reconnect.');
      });
      this.setStatus('Preparing speech recognition. The first download is about 45 MB.');
      await this.loadEngine();
      if (this.session !== session) return;
      const model = new Vosk.Model(new URL('/speech/en-small-0.15.tar.gz', location.href).href, -2);
      session.model = model;
      await new Promise((resolve, reject) => {
        session.cancelLoad = () => reject(new Error('cancelled'));
        session.loadTimer = setTimeout(() => reject(new Error('download')), 120000);
        model.on('load', ({ result }) => result ? resolve() : reject(new Error('download')));
        model.on('error', () => {
          if (this.session === session) this.stop('Voice recognition stopped. Tap Hands-free to try again.');
        });
      });
      clearTimeout(session.loadTimer);
      session.cancelLoad = null;
      if (this.session !== session) return;
      if (!this.worklets.has(context)) {
        const loaded = context.audioWorklet.addModule('/speech/mic-worklet.js').catch(error => {
          this.worklets.delete(context);
          throw error;
        });
        this.worklets.set(context, loaded);
      }
      await this.worklets.get(context);
      if (this.session !== session) return;
      if (!this.game.ttsEnabled) {
        session.enabledNarrator = true;
        this.game.setNarratorEnabled(true);
      }
      session.source = context.createMediaStreamSource(stream);
      session.node = new AudioWorkletNode(context, 'draco-local-mic', {
        numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [1],
      });
      session.node.port.onmessage = ({ data }) => {
        if (this.session === session && this.mayListen(session) && session.recognizer) {
          let peak = 0;
          for (let i = 0; i < data.length; i++) peak = Math.max(peak, Math.abs(data[i]));
          this.level.value = Math.min(1, peak * 4);
          session.recognizer.acceptWaveformFloat(data, context.sampleRate);
        }
      };
      // The worklet emits silence on its output; the destination keeps it scheduled.
      session.source.connect(session.node);
      session.node.connect(context.destination);
      await context.resume();
      if (this.session !== session) return;
      session.tick = setInterval(() => this.update(session), 150);
      this.update(session);
    } catch (error) {
      if (this.session !== session) return;
      const errors = {
        NotAllowedError: 'Allow microphone access for Draco in your browser, then turn Hands-free on.',
        NotFoundError: 'Connect a microphone, then turn Hands-free on.',
        NotReadableError: 'The browser could not open the microphone. Check your input device and try again.',
        download: 'Speech recognition could not load. Check your connection and tap Hands-free to retry.',
      };
      this.stop(errors[error.name] || errors[error.message] || 'Hands-free could not start. Tap Hands-free to retry.');
    }
  }

  mayListen(session) {
    return !document.hidden && this.game.state === session.adventure &&
      (this.game.ttsSpeaking || this.maySendMove()) &&
      !document.getElementById('bottom-sheet').classList.contains('open');
  }

  maySendMove() {
    return !this.game.isSending && !this.input.value.trim() && !document.querySelector('.retry-turn');
  }

  suspendListening() {
    const session = this.session;
    if (!session?.recognizer) return;
    const recognizer = session.recognizer;
    session.recognizer = null;
    session.awaitingWakeFinal = false;
    this.level.hidden = true;
    this.level.value = 0;
    session.stream.getAudioTracks().forEach(track => { track.enabled = false; });
    session.node.port.postMessage(false);
    recognizer.remove();
  }

  update(session) {
    if (this.session !== session) return;
    if (!this.mayListen(session)) {
      this.suspendListening();
      if (this.game.isSending) this.setStatus('The narrator is thinking.');
      else if (document.querySelector('.retry-turn')) this.setStatus('Hands-free will listen again after you retry.');
      else this.setStatus('Hands-free waits while you use the controls.');
      return;
    }
    // Discard unfinished speaker audio before opening the floor for a plain reply.
    if (session.recognizer && session.speaking !== this.game.ttsSpeaking && !session.interrupted) {
      this.suspendListening();
      if (session.speaking) session.quietUntil = performance.now() + 150;
    }
    if (!session.speaking && this.game.ttsSpeaking) session.interrupted = false;
    session.speaking = this.game.ttsSpeaking;
    if (session.recognizer || performance.now() < (session.quietUntil || 0)) return;
    this.setStatus(session.speaking ? 'Say “Hey Story” to interrupt.' :
      'Listening. Say your move, then pause.');
    this.level.hidden = false;
    const recognizer = new session.model.KaldiRecognizer(this.game.audioContext.sampleRate);
    session.recognizer = recognizer;
    recognizer.on('error', () => {
      if (session.recognizer === recognizer) this.stop('Voice recognition stopped. Tap Hands-free to retry.');
    });
    recognizer.on('partialresult', ({ result }) => {
      if (this.session === session && session.recognizer === recognizer && this.mayListen(session) &&
          this.game.ttsSpeaking && storyWakePhrase.test(result.partial)) {
        session.awaitingWakeFinal = true;
        this.cutIn(session);
      }
    });
    recognizer.on('result', ({ result }) => {
      if (this.session === session && session.recognizer === recognizer && this.mayListen(session)) {
        this.onWords(session, result.text);
      }
    });
    session.stream.getAudioTracks().forEach(track => { track.enabled = true; });
    session.node.port.postMessage(true);
  }

  cutIn(session) {
    this.game.stopSpeaking();
    session.interrupted = true;
    session.addressedUntil = performance.now() + 7000;
    this.setStatus('Go ahead. What do you do?');
  }

  onWords(session, words) {
    const phrase = words.trim();
    if (!phrase) return;
    const playback = session.speaking || this.game.ttsSpeaking;
    const listeningForWake = playback || session.awaitingWakeFinal;
    const match = storyWakePhrase.exec(phrase);
    const wake = match && (listeningForWake || match.index === 0) ? match : null;
    if (session.awaitingWakeFinal) {
      session.awaitingWakeFinal = false;
      // A partial stopped playback. An unconfirmed final may still contain speaker audio.
      if (!wake) return;
    }
    const address = /^dragon(?:\s+|$)/i.exec(phrase);
    if (playback && !session.interrupted && !wake) return;
    if (wake && this.game.ttsSpeaking) this.cutIn(session);
    const addressed = wake || address;
    const afterWake = performance.now() < (session.addressedUntil || 0);
    let move = phrase.slice(addressed ? addressed.index + addressed[0].length : 0).trim();
    if (!move || (addressed && /^(?:wait|hold on)$/i.test(move))) {
      if (wake && !session.interrupted) this.cutIn(session);
      else this.game.stopSpeaking();
      return;
    }
    if (!this.maySendMove()) return;
    session.interrupted = false;
    session.addressedUntil = 0;
    if (/^(?:stop listening|pause listening|microphone off)$/i.test(move) || (addressed && /^pause$/i.test(move))) {
      this.stop('Microphone off. Tap Hands-free to play again.');
      return;
    }
    const players = session.adventure.players;
    let speaker = players[0].name;
    if (players.length > 1) {
      // A direct reply can come from anyone at a shared microphone.
      speaker = 'The group';
      const numbered = /^(?:(?:keeper|dragon) )?(one|won|two|too|to|three|four|for|[1-4])\s+(.+)$/i.exec(move);
      if ((addressed || afterWake) && numbered) {
        const slots = { one: 0, won: 0, 1: 0, two: 1, too: 1, to: 1, 2: 1, three: 2, 3: 2, four: 3, for: 3, 4: 3 };
        const player = players[slots[numbered[1].toLowerCase()]];
        if (!player) {
          this.setStatus('That player number is outside this game. Say your move again.');
          return;
        }
        speaker = player.name;
        move = numbered[2];
        document.getElementById('select-player').value = speaker;
      }
    }
    this.suspendListening();
    this.input.value = move;
    this.game.send(speaker);
  }

  stop(message = 'Microphone off.') {
    const session = this.session;
    if (!session) return;
    this.suspendListening();
    this.session = null;
    if (session.enabledNarrator) {
      this.game.setNarratorEnabled(localStorage.getItem('draco_tts_enabled') === 'true');
    }
    clearInterval(session.tick);
    clearTimeout(session.loadTimer);
    session.cancelLoad?.();
    session.stream?.getTracks().forEach(track => track.stop());
    session.source?.disconnect();
    session.node?.disconnect();
    session.node?.port.close();
    session.model?.terminate();
    this.button.setAttribute('aria-checked', 'false');
    document.getElementById('btn-mic').disabled = false;
    this.setStatus(message);
  }
}
