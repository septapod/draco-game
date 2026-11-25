// Batch microphone frames for local speech recognition. Output stays silent.
class DracoLocalMic extends AudioWorkletProcessor {
  constructor() {
    super();
    this.samples = new Float32Array(4096);
    this.offset = 0;
    this.listening = false;
    this.port.onmessage = ({ data }) => {
      this.listening = data === true;
      this.offset = 0;
    };
  }

  process(inputs) {
    const channel = inputs[0]?.[0];
    if (!this.listening || !channel) return true;
    let start = 0;
    while (start < channel.length) {
      const count = Math.min(this.samples.length - this.offset, channel.length - start);
      this.samples.set(channel.subarray(start, start + count), this.offset);
      this.offset += count;
      start += count;
      if (this.offset === this.samples.length) {
        this.port.postMessage(this.samples, [this.samples.buffer]);
        this.samples = new Float32Array(4096);
        this.offset = 0;
      }
    }
    return true;
  }
}
registerProcessor('draco-local-mic', DracoLocalMic);
