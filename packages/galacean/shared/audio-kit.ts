// Audio kit: WAV files made in code, loaded clips and a waveform scene
import { AssetType, type AudioClip, AudioSource, type Camera, type Engine, type Entity, Texture2D, UnlitMaterial } from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { add, quadMesh } from './gfx-kit.ts';
import { addCamera, createStage, type Stage, type StageOptions } from './stage.ts';
import { paint } from './textures.ts';

export const RATE = 22050;

/** 16-bit mono PCM samples (-1..1) as the bytes of a RIFF/WAVE file. */
export function wavBytes(samples: Float32Array, rate = RATE): Uint8Array {
  const data = samples.length * 2;
  const bytes = new Uint8Array(44 + data);
  const view = new DataView(bytes.buffer);
  const text = (at: number, s: string): void => [...s].forEach((c, i) => view.setUint8(at + i, c.charCodeAt(0)));
  text(0, 'RIFF');
  view.setUint32(4, 36 + data, true);
  text(8, 'WAVE');
  text(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, rate, true);
  view.setUint32(28, rate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, 'data');
  view.setUint32(40, data, true);
  samples.forEach((v, i) => view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 32767, true));
  return bytes;
}

/** A plucked note: a decaying triangle-ish tone with a soft attack. */
export function pluck(freq: number, seconds: number, gain = 0.5, rate = RATE): Float32Array {
  const out = new Float32Array(Math.floor(seconds * rate));
  for (let i = 0; i < out.length; i++) {
    const t = i / rate;
    const env = Math.min(1, t * 120) * Math.exp(-t * 4.5);
    const phase = t * freq;
    out[i] = gain * env * (Math.sin(phase * 2 * Math.PI) + 0.35 * Math.sin(phase * 4 * Math.PI) + 0.12 * Math.sin(phase * 6 * Math.PI));
  }
  return out;
}

/** Notes laid one after another, `step` seconds apart, mixed into one buffer of `seconds`. */
export function melody(freqs: number[], step: number, seconds: number, rate = RATE): Float32Array {
  const out = new Float32Array(Math.floor(seconds * rate));
  freqs.forEach((f, n) => {
    const note = pluck(f, 0.9, 0.55, rate);
    const at = Math.floor(n * step * rate);
    for (let i = 0; i < note.length && at + i < out.length; i++) out[at + i] = (out[at + i] ?? 0) + (note[i] ?? 0);
  });
  return out;
}

export const kick = (rate = RATE): Float32Array => Float32Array.from({ length: Math.floor(0.25 * rate) }, (_, i) => Math.sin(2 * Math.PI * (50 + 110 * Math.exp(-(i / rate) * 30)) * (i / rate)) * Math.exp(-(i / rate) * 14) * 0.9);
export const snare = (rate = RATE): Float32Array => Float32Array.from({ length: Math.floor(0.2 * rate) }, (_, i) => (Math.sin(i * 12.9898) * 43758.5453 % 1) * Math.exp(-(i / rate) * 22) * 0.6);
export const hat = (rate = RATE): Float32Array => Float32Array.from({ length: Math.floor(0.08 * rate) }, (_, i) => (Math.sin(i * 78.233) * 12345.678 % 1) * Math.exp(-(i / rate) * 60) * 0.35);

export interface Loaded {
  clip: AudioClip;
  samples: Float32Array;
}

/** WAV bytes -> blob URL -> `AssetType.Audio`, the way the docs load audio; the URL is revoked afterwards. */
export async function loadClip(stage: Stage, samples: Float32Array, rate = RATE): Promise<Loaded> {
  const url = URL.createObjectURL(new Blob([wavBytes(samples, rate) as BlobPart], { type: 'audio/wav' }));
  stage.own(() => URL.revokeObjectURL(url));
  const clip = await stage.engine.resourceManager.load<AudioClip>({ url, type: AssetType.Audio });
  return { clip, samples };
}

/** An amplitude picture of `samples`: a mirrored bar per pixel column. */
export function waveformTexture(engine: Engine, samples: Float32Array): Texture2D {
  const canvas = paint(512, (g, size) => {
    g.fillStyle = '#10151f';
    g.fillRect(0, 0, size, size);
    g.fillStyle = '#5fb4ff';
    const per = samples.length / size;
    for (let x = 0; x < size; x++) {
      let peak = 0;
      for (let i = Math.floor(x * per); i < Math.floor((x + 1) * per); i++) peak = Math.max(peak, Math.abs(samples[i]!));
      const h = Math.max(1, peak * size * 0.46);
      g.fillRect(x, size / 2 - h, 1, h * 2);
    }
    g.fillStyle = '#2b3547';
    g.fillRect(0, size / 2, size, 1);
  });
  const texture = new Texture2D(engine, 512, 512, undefined, false, true);
  texture.setImageSource(canvas);
  return texture;
}

export interface AudioWorld {
  stage: Stage;
  root: Entity;
  camera: Camera;
  /** An entity with an AudioSource playing `loaded.clip` (nothing plays until `play()` is called). */
  speaker(loaded: Loaded, name?: string): { entity: Entity; source: AudioSource };
  /** Draws the waveform and returns a function that moves the playhead to a time in seconds. */
  scope(loaded: Loaded): (seconds: number) => void;
}

/** An orthographic stage for waveforms. `play()` is never called here: examples do it from buttons. */
export async function audioWorld(el: HTMLElement, ctx: MountContext, options: StageOptions = {}): Promise<AudioWorld> {
  const stage = await createStage(el, ctx, { background: [0.015, 0.02, 0.03, 1], ...options });
  const camera = addCamera(stage.root, [0, 0, 6], [0, 0, 0]);
  camera.isOrthographic = true;
  camera.orthographicSize = 1.5;
  return {
    stage,
    root: stage.root,
    camera,
    speaker(loaded, name = 'speaker') {
      const entity = stage.root.createChild(name);
      const source = entity.addComponent(AudioSource);
      source.clip = loaded.clip;
      source.playOnEnabled = false;
      return { entity, source };
    },
    scope(loaded) {
      const { engine } = stage;
      const picture = new UnlitMaterial(engine);
      picture.baseTexture = waveformTexture(engine, loaded.samples);
      add(stage.root, quadMesh(engine, 5, 2.4), picture, [0, 0, 0], 'waveform');
      const head = new UnlitMaterial(engine);
      head.baseColor.set(1, 0.8, 0.3, 1);
      const bar = add(stage.root, quadMesh(engine, 0.04, 2.4), head, [-2.5, 0, 0.01], 'playhead').entity;
      return (seconds) => {
        const f = Math.max(0, Math.min(1, seconds / loaded.clip.duration));
        bar.transform.setPosition(-2.5 + f * 5, 0, 0.01);
      };
    },
  };
}
