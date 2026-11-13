// Synthesized sound data for the audio examples, so they load no sound files
//
// Each function returns an AudioBuffer, which CreateSoundAsync and CreateSoundBufferAsync
// accept as their `source` in place of a URL. The samples are computed directly; no
// AudioContext is needed to build them.

const RATE = 44100;

function buffer(seconds: number, fill: (t: number, i: number) => number, channels = 1): AudioBuffer {
  const length = Math.round(seconds * RATE);
  const out = new AudioBuffer({ length, sampleRate: RATE, numberOfChannels: channels });
  const data = out.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = fill(i / RATE, i);
  for (let c = 1; c < channels; c++) out.copyToChannel(data, c);
  return out;
}

/** A short pitched blip with a fast attack and exponential decay. */
export function blip(frequency = 660, seconds = 0.35): AudioBuffer {
  return buffer(seconds, (t) => Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 12) * Math.min(1, t * 400) * 0.8);
}

/** A falling "boing": a sine whose pitch drops, like a ball bounce. */
export function bounce(seconds = 0.5): AudioBuffer {
  let phase = 0;
  return buffer(seconds, (t) => {
    const f = 180 + 520 * Math.exp(-t * 9);
    phase += (2 * Math.PI * f) / RATE;
    return Math.sin(phase) * Math.exp(-t * 6) * Math.min(1, t * 300) * 0.8;
  });
}

/** A steady tone, loopable without clicks because it holds a whole number of cycles. */
export function tone(frequency = 440, seconds = 1): AudioBuffer {
  const cycles = Math.max(1, Math.round(frequency * seconds));
  const f = cycles / seconds;
  return buffer(seconds, (t) => Math.sin(2 * Math.PI * f * t) * 0.5);
}

/** A one-bar loop: a bass pulse on each beat and a chord arpeggio over it, for buses and analyzers. */
export function groove(bpm = 112): AudioBuffer {
  const beat = 60 / bpm;
  const notes = [220, 277.18, 329.63, 440, 329.63, 277.18, 220, 164.81];
  const step = beat / 2;
  return buffer(beat * 4, (t) => {
    const tb = t % beat;
    const kick = Math.sin(2 * Math.PI * (60 + 90 * Math.exp(-tb * 30)) * tb) * Math.exp(-tb * 10);
    const n = Math.floor(t / step) % notes.length;
    const ts = t % step;
    const arp = Math.sin(2 * Math.PI * notes[n]! * ts) * Math.exp(-ts * 8) * 0.5;
    const hat = (Math.random() * 2 - 1) * Math.exp(-((t + step / 2) % step) * 60) * 0.15;
    return (kick * 0.6 + arp + hat) * 0.6;
  });
}

/** Encodes a buffer's first channel as a 16-bit mono WAV file, for APIs that take a URL. */
export function wavBlob(audio: AudioBuffer): Blob {
  const samples = audio.getChannelData(0);
  const bytes = new DataView(new ArrayBuffer(44 + samples.length * 2));
  const text = (at: number, s: string): void => [...s].forEach((c, i) => bytes.setUint8(at + i, c.charCodeAt(0)));
  text(0, 'RIFF');
  bytes.setUint32(4, 36 + samples.length * 2, true);
  text(8, 'WAVEfmt ');
  bytes.setUint32(16, 16, true);
  bytes.setUint16(20, 1, true); // PCM
  bytes.setUint16(22, 1, true); // mono
  bytes.setUint32(24, audio.sampleRate, true);
  bytes.setUint32(28, audio.sampleRate * 2, true);
  bytes.setUint16(32, 2, true);
  bytes.setUint16(34, 16, true);
  text(36, 'data');
  bytes.setUint32(40, samples.length * 2, true);
  samples.forEach((v, i) => bytes.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 0x7fff, true));
  return new Blob([bytes.buffer], { type: 'audio/wav' });
}
