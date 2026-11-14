// Envelope examples: a drone behind an envelope, and its curve with a dot
import * as Tone from 'tone';
import { plot, type Plot, type PlotOptions } from './curve-plot.ts';
import type { Stage } from './stage.ts';

export interface AmpVoice {
  osc: Tone.Oscillator;
  env: Tone.AmplitudeEnvelope;
  out: Tone.Volume;
}

/** A steady oscillator behind an AmplitudeEnvelope: only the envelope decides when it is heard. */
export function ampVoice(env: Partial<Tone.EnvelopeOptions> = {}, type: Tone.ToneOscillatorType = 'triangle', hz = 220): AmpVoice {
  const out = new Tone.Volume(-10).toDestination();
  const e = new Tone.AmplitudeEnvelope(env).connect(out);
  const osc = new Tone.Oscillator(hz, type).connect(e).start();
  return { osc, env: e, out };
}

export interface Timing {
  /** Seconds to hold the note (attack and decay, then a short rest at the sustain level). */
  hold: number;
  /** Seconds from the note on to the end of the release. */
  total: number;
}

export interface EnvView {
  readonly plot: Plot;
  /**
   * Draws `env`'s curve when the note sounds, with `text` under it, and returns the timing for
   * the note: pass `hold` to triggerAttackRelease. `scale` shrinks the drawn curve (velocity).
   */
  show(env: Tone.Envelope, time: number, text: string, scale?: number): Timing;
  /** Full view: draws the curve now, before the first note, so the plot is never empty. */
  preview(env: Tone.Envelope, text: string, scale?: number): void;
  /** Call from the stage's frame(): moves the dot. */
  frame(seconds: number): void;
}

const POINTS = 320;

export function envView(stage: Stage, opts: Partial<PlotOptions> = {}): EnvView {
  const pl = plot(stage, { yMin: -0.06, yMax: 1.08, guides: [0, 1], ...opts });
  const caption = document.createElement('div');
  caption.style.cssText = 'font:600 12px/1.3 ui-monospace,monospace;color:var(--fg-1);text-align:center;white-space:pre-line;min-height:16px';
  stage.visual.append(caption);
  let total = 1;
  let shown = false;
  const timingOf = (env: Tone.Envelope): Timing => {
    const a = env.toSeconds(env.attack);
    const d = env.toSeconds(env.decay);
    const r = env.toSeconds(env.release);
    return { hold: a + d + 0.1 * (a + d + r), total: 1.1 * (a + d + r) };
  };
  // asArray rescales the envelope into a short offline render: the picture of its shape.
  const draw = (curve: Promise<Float32Array>, timing: Timing, text: string, scale: number): void => {
    void curve.then((c) => {
      total = timing.total;
      shown = true;
      pl.set([{ y: scale === 1 ? c : c.map((v) => v * scale) }]);
      caption.textContent = text;
    });
  };
  return {
    plot: pl,
    show(env, time, text, scale = 1) {
      const timing = timingOf(env);
      const curve = env.asArray(POINTS);
      stage.show(time, () => draw(curve, timing, text, scale));
      return timing;
    },
    preview(env, text, scale = 1) {
      draw(env.asArray(POINTS), timingOf(env), text, scale);
    },
    frame(seconds) {
      if (shown) pl.render(Math.min(1, seconds / total));
    },
  };
}

/** "0.30 s" for a time in seconds. */
export function secs(v: number): string {
  return `${Math.round(v * 1000) / 1000} s`;
}
