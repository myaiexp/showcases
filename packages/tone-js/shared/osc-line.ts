// Mount factory for bare-oscillator examples: a tune, a caption, keys
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from './stage.ts';
import { bigLabel, keyboard } from './widgets.ts';

/** What every Tone oscillator class offers: the part the tune needs. */
export interface OscLike {
  frequency: { setValueAtTime(value: number, time: number): unknown };
  state: string;
  start(time?: number): unknown;
  stop(time?: number): unknown;
  connect(node: Tone.InputNode): unknown;
  dispose(): unknown;
}

export interface Voice<O extends OscLike> {
  osc: O;
  env: Tone.AmplitudeEnvelope;
  out: Tone.Volume;
  dispose(): void;
}

/** An oscillator gated by an amplitude envelope, so a tune of separate notes has no clicks. */
export function voice<O extends OscLike>(osc: O, volume = -12): Voice<O> {
  const out = new Tone.Volume(volume).toDestination();
  const env = new Tone.AmplitudeEnvelope({ attack: 0.01, decay: 0.1, sustain: 0.85, release: 0.08 }).connect(out);
  osc.connect(env);
  return {
    osc,
    env,
    out,
    dispose() {
      osc.dispose();
      env.dispose();
      out.dispose();
    },
  };
}

const TUNE = ['C3', 'E3', 'G3', 'C4', 'G3', 'E3', 'G3', 'C3'];

export interface OscConfig<O extends OscLike> {
  seconds: number;
  /** Builds the oscillator the example is about (not yet connected). */
  make(): O;
  /** Text under the keys for the current settings. */
  caption(osc: O): string;
  variants?: readonly { label: string; apply(osc: O): void }[];
  /** Full view inputs. Call `refresh()` after a change so the caption updates. */
  controls?(osc: O, bar: HTMLElement, refresh: () => void): void;
  notes?: readonly string[];
  step?: number;
  hold?: number;
  low?: string;
  high?: string;
  volume?: number;
}

/** Builds a mount that plays one tune on the oscillator, with variants and controls. */
export function oscMount<O extends OscLike>(cfg: OscConfig<O>): Mount {
  return (el, ctx) => {
    const stage = toneStage(el, ctx, { seconds: cfg.seconds });
    const keys = keyboard(stage.visual, cfg.low ?? 'C3', cfg.high ?? 'C5');
    const label = bigLabel(stage.visual);
    const notes = cfg.notes ?? TUNE;
    const step = cfg.step ?? 0.3;
    const hold = cfg.hold ?? 0.26;
    const hz = (n: string): number => Tone.Frequency(n).toFrequency();

    return stage.run({
      build: () => voice(cfg.make(), cfg.volume),

      play: (v, time) => {
        const text = cfg.caption(v.osc);
        stage.show(time, () => (label.textContent = text));
        notes.forEach((n, i) => {
          const at = time + i * step;
          v.osc.frequency.setValueAtTime(hz(n), at);
          v.env.triggerAttackRelease(hold, at);
          stage.show(at, () => keys.press(n, hold));
        });
        v.osc.start(time);
        v.osc.stop(time + notes.length * step + 0.2);
      },
      stop: (v, time) => {
        v.env.triggerRelease(time);
        v.osc.stop(time + 0.1);
      },

      variants: cfg.variants?.map((variant) => ({
        label: variant.label,
        apply: (v: Voice<O>) => variant.apply(v.osc),
      })),

      controls: (v, bar) => {
        keys.onPress(async (note) => {
          await Tone.start();
          const now = Tone.now();
          v.osc.frequency.setValueAtTime(hz(note), now);
          if (v.osc.state !== 'started') v.osc.start(now);
          v.env.triggerAttackRelease(0.4, now);
          v.osc.stop(now + 0.6);
        });
        cfg.controls?.(v.osc, bar, () => (label.textContent = cfg.caption(v.osc)));
      },
    });
  };
}
