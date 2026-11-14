// Synthesised sounds as in-memory WAV blobs, loaded as audio assets with no network
import * as pc from 'playcanvas';

const RATE = 22050;

/** Mono 16-bit PCM WAV from samples in -1..1. */
function encodeWav(samples: Float32Array): Blob {
  const buf = new ArrayBuffer(44 + samples.length * 2);
  const v = new DataView(buf);
  const str = (o: number, s: string): void => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF');
  v.setUint32(4, 36 + samples.length * 2, true);
  str(8, 'WAVEfmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true);
  v.setUint16(22, 1, true);
  v.setUint32(24, RATE, true);
  v.setUint32(28, RATE * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, 'data');
  v.setUint32(40, samples.length * 2, true);
  samples.forEach((s, i) => v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, s)) * 32767, true));
  return new Blob([buf], { type: 'audio/wav' });
}

/** One soft note: a sine with a short attack and a decay. */
export function note(freq: number, seconds: number, volume = 0.5): Float32Array {
  const out = new Float32Array(Math.floor(seconds * RATE));
  for (let i = 0; i < out.length; i++) {
    const t = i / RATE;
    const env = Math.min(1, t / 0.01) * Math.exp((-3 * t) / seconds);
    out[i] = Math.sin(2 * Math.PI * freq * t) * env * volume + Math.sin(4 * Math.PI * freq * t) * env * volume * 0.25;
  }
  return out;
}

/** Concatenates clips end to end. */
export function join(...clips: Float32Array[]): Float32Array {
  const out = new Float32Array(clips.reduce((n, c) => n + c.length, 0));
  let at = 0;
  for (const c of clips) {
    out.set(c, at);
    at += c.length;
  }
  return out;
}

export interface SoundAssets {
  /** Blob URLs to revoke when the example unmounts. */
  urls: string[];
  dispose(): void;
}

/** Loads samples as an 'audio' asset on the app. Resolves once the engine decoded it. */
export function loadAudio(app: pc.AppBase, name: string, samples: Float32Array, owner: SoundAssets): Promise<pc.Asset> {
  const url = URL.createObjectURL(encodeWav(samples));
  owner.urls.push(url);
  const asset = new pc.Asset(name, 'audio', { url });
  return new Promise((resolve, reject) => {
    asset.ready(() => resolve(asset));
    asset.once('error', (e: string) => reject(new Error(e)));
    app.assets.add(asset);
    app.assets.load(asset);
  });
}

export function createSoundAssets(): SoundAssets {
  const urls: string[] = [];
  return {
    urls,
    dispose() {
      urls.forEach((u) => URL.revokeObjectURL(u));
      urls.length = 0;
    },
  };
}
