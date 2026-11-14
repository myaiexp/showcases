// Stand-in recordings rendered in code, as WAV blob URLs that file sounds can load
import { recipe, type RecordingName } from './recipes.ts';

/**
 * The README loads sounds from files ('./audio/drums.mp3'). Cards may not fetch and the docs
 * ship no audio, so these "recordings" are rendered with a plain OfflineAudioContext (not
 * Pizzicato, so a card render's context swap never touches them) and encoded as 16-bit WAV
 * blobs. A blob: URL loads through XMLHttpRequest like any path, without the network.
 * Each is rendered once per page and kept: they are small, and many examples share them.
 */
export type { RecordingName } from './recipes.ts';

const RATE = 32000;
const cache = new Map<RecordingName, Promise<{ url: string; samples: Float32Array; seconds: number }>>();

function wav(channels: Float32Array[], rate: number): Blob {
  const frames = channels[0]!.length;
  const n = channels.length;
  const data = new DataView(new ArrayBuffer(44 + frames * n * 2));
  const text = (at: number, s: string): void => [...s].forEach((c, i) => data.setUint8(at + i, c.charCodeAt(0)));
  text(0, 'RIFF');
  data.setUint32(4, 36 + frames * n * 2, true);
  text(8, 'WAVEfmt ');
  data.setUint32(16, 16, true);
  data.setUint16(20, 1, true);
  data.setUint16(22, n, true);
  data.setUint32(24, rate, true);
  data.setUint32(28, rate * n * 2, true);
  data.setUint16(32, n * 2, true);
  data.setUint16(34, 16, true);
  text(36, 'data');
  data.setUint32(40, frames * n * 2, true);
  let at = 44;
  for (let i = 0; i < frames; i++) {
    for (const ch of channels) {
      const v = Math.max(-1, Math.min(1, ch[i]!));
      data.setInt16(at, v < 0 ? v * 0x8000 : v * 0x7fff, true);
      at += 2;
    }
  }
  return new Blob([data.buffer], { type: 'audio/wav' });
}

function load(name: RecordingName): Promise<{ url: string; samples: Float32Array; seconds: number }> {
  let job = cache.get(name);
  if (!job) {
    job = (async () => {
      const r = recipe(name);
      const off = new OfflineAudioContext(r.channels, Math.ceil(r.seconds * RATE), RATE);
      r.render(off);
      const buffer = await off.startRendering();
      const channels = Array.from({ length: buffer.numberOfChannels }, (_, c) => buffer.getChannelData(c));
      // Normalised to a steady peak, so every recording plays at about the same level.
      let peak = 0.001;
      for (const ch of channels) for (const s of ch) peak = Math.max(peak, Math.abs(s));
      for (const ch of channels) for (let i = 0; i < ch.length; i++) ch[i]! *= 0.8 / peak;
      return { url: URL.createObjectURL(wav(channels, RATE)), samples: channels[0]!.slice(), seconds: r.seconds };
    })();
    cache.set(name, job);
  }
  return job;
}

/** A blob: URL of the named recording, for `{ source: 'file', options: { path } }`. */
export async function recording(name: RecordingName): Promise<string> {
  return (await load(name)).url;
}

/** The recording's samples (first channel) and length, for drawing it. */
export async function recordingWave(name: RecordingName): Promise<{ samples: Float32Array; seconds: number }> {
  const { samples, seconds } = await load(name);
  return { samples, seconds };
}

let notAudio: string | undefined;
/** A blob: URL that loads but is not audio: decoding it fails, like a format the browser lacks. */
export function unplayableFile(): string {
  notAudio ??= URL.createObjectURL(new Blob(['This file is not audio.'], { type: 'audio/x-unknown' }));
  return notAudio;
}
