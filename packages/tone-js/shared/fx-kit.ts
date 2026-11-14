// Helpers for effect examples: a test source, a signal-flow picture, the spec
import * as Tone from 'tone';
import { sample } from './samples.ts';
import type { Stage, ToneSpec } from './stage.ts';

/** A sound to run through an effect: a synth riff, or a stand-in recording. */
export type FxSource = 'riff' | 'drums' | 'voice' | 'melody' | 'chord';

export interface Source {
  /** Connect this to the effect. */
  readonly out: Tone.Gain;
  start(time: number): void;
  stop(time: number): void;
  dispose(): void;
}

const RIFF = ['C3', 'Eb3', 'G3', 'Bb3', 'C4', 'Bb3', 'G3', 'Eb3'];

/** The sound an effect is shown on. Call inside build(): recordings are rendered in code. */
export async function source(name: FxSource): Promise<Source> {
  const out = new Tone.Gain();
  if (name === 'riff') {
    // Eight sawtooth notes, a quarter second apart: bright enough for any effect to show.
    const synth = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.6, release: 0.15 },
      volume: -12,
    }).connect(out);
    return {
      out,
      start: (time) => RIFF.forEach((n, i) => synth.triggerAttackRelease(n, 0.2, time + i * 0.25)),
      stop: (time) => synth.triggerRelease(time),
      dispose: () => {
        synth.dispose();
        out.dispose();
      },
    };
  }
  const player = new Tone.Player({ url: await sample(name) }).connect(out);
  return {
    out,
    start: (time) => void player.start(time),
    stop: (time) => void player.stop(time),
    dispose: () => {
      player.dispose();
      out.dispose();
    },
  };
}

export interface Flow {
  /** Writes the caption under the diagram; `dry` greys out the effect boxes. */
  set(caption: string, dry?: boolean): void;
  /** Fills the level bar (0 to about 0.5, an RMS). */
  level(rms: number): void;
}

/** A small "source -> effect -> speakers" diagram with a caption and a level bar. */
export function flow(parent: HTMLElement, from: string, stages: readonly string[]): Flow {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;flex:1 1 auto;min-height:0;padding:4px 8px';
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;font:600 12px/1.2 ui-monospace,monospace';
  const effectBoxes: HTMLElement[] = [];
  const names = [from, ...stages, 'speakers'];
  names.forEach((name, i) => {
    if (i > 0) row.append(Object.assign(document.createElement('span'), { textContent: '→', style: 'color:var(--fg-3)' }));
    const b = document.createElement('div');
    const isEffect = i > 0 && i <= stages.length;
    b.textContent = name;
    b.style.cssText = `padding:5px 9px;border-radius:6px;border:1px solid ${isEffect ? '#7aa2ff' : 'var(--border)'};background:var(--bg-surface);color:var(--fg-1);transition:opacity .15s`;
    if (isEffect) effectBoxes.push(b);
    row.append(b);
  });
  const text = document.createElement('div');
  text.style.cssText = 'font:600 16px/1.3 ui-monospace,monospace;color:var(--fg-1);text-align:center;min-height:21px';
  const track = document.createElement('div');
  track.style.cssText = 'width:min(320px,90%);height:8px;border-radius:4px;background:var(--bg-surface);border:1px solid var(--border);overflow:hidden';
  const fill = document.createElement('div');
  fill.style.cssText = 'height:100%;width:0;background:#7aa2ff';
  track.append(fill);
  wrap.append(row, text, track);
  parent.append(wrap);
  return {
    set(caption, dry = false) {
      text.textContent = caption;
      for (const b of effectBoxes) b.style.opacity = dry ? '0.3' : '1';
    },
    level(rms) {
      fill.style.width = `${Math.min(100, Math.round(rms * 220))}%`;
    },
  };
}

/** Root-mean-square level of a window of samples. */
export function rms(s: Float32Array): number {
  let sum = 0;
  for (const x of s) sum += x * x;
  return s.length ? Math.sqrt(sum / s.length) : 0;
}

export interface FxVariant<E> {
  /** Short label shown on the card while this variant plays. */
  label: string;
  /** Caption under the diagram (defaults to the label). */
  detail?: string;
  /** True for the untouched sound: the effect boxes grey out. */
  dry?: boolean;
  apply(fx: E): void;
}

/** The untouched sound: an effect with wet = 0 passes only the dry signal. */
export const DRY: FxVariant<{ wet: { value: number } }> = {
  label: 'dry',
  detail: 'dry: wet = 0, effect off',
  dry: true,
  apply(fx) {
    fx.wet.value = 0;
  },
};

export interface FxConfig<E extends Tone.ToneAudioNode> {
  source: FxSource;
  /** Effect names for the diagram. */
  stages: readonly string[];
  /** Caption shown in the full view before any variant applies. */
  caption?: string;
  /** Makes the effect and wires `src.out` through it to the destination. Await `ready` here. */
  create(src: Source): E | Promise<E>;
  variants?: readonly FxVariant<NoInfer<E>>[];
  controls?(fx: E, bar: HTMLElement, flow: Flow): void;
  /** Extra scheduling at the start of each pass. */
  onPlay?(fx: E, time: number): void;
  /** Every animation frame while a pass plays. */
  onFrame?(fx: E, time: number, flow: Flow): void;
  /** Extra undo work, run before the nodes are disposed. */
  cleanup?(fx: E): void;
}

export interface FxGraph<E> {
  src: Source;
  fx: E;
  current?: FxVariant<E>;
}

/** Builds the ToneSpec shared by effect examples: source -> effect, variants, level bar. */
export function fxSpec<E extends Tone.ToneAudioNode>(stage: Stage, cfg: FxConfig<E>): ToneSpec<FxGraph<E>> {
  const f = flow(stage.visual, cfg.source, cfg.stages);
  f.set(cfg.caption ?? '');
  let live: FxGraph<E> | undefined;
  return {
    build: async () => {
      const src = await source(cfg.source);
      const fx = await cfg.create(src);
      live = { src, fx };
      return live;
    },
    play: (g, time) => {
      g.src.start(time);
      cfg.onPlay?.(g.fx, time);
      const v = g.current;
      stage.show(time, () => f.set(v ? (v.detail ?? v.label) : (cfg.caption ?? ''), v?.dry));
    },
    stop: (g, time) => g.src.stop(time),
    variants: cfg.variants?.map((v) => ({
      label: v.label,
      apply: (g: FxGraph<E>) => {
        g.current = v;
        v.apply(g.fx);
      },
    })),
    controls: cfg.controls ? (g, bar) => cfg.controls!(g.fx, bar, f) : undefined,
    frame: (time) => {
      f.level(rms(stage.samples()));
      if (live) cfg.onFrame?.(live.fx, time, f);
    },
    dispose: (g) => {
      cfg.cleanup?.(g.fx);
      g.fx.dispose();
      g.src.dispose();
      live = undefined;
    },
  };
}
