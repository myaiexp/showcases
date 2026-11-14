// An LFO steering an oscillator's pitch with its curve drawn, for LFO examples
import * as Tone from 'tone';
import { slider } from './controls.ts';
import { burst, sampleFn, trace, voice, wave, type WaveType } from './signal-kit.ts';
import type { Stage, ToneSpec } from './stage.ts';

export interface LfoCase {
  label: string;
  caption: string;
  rate: number;
  min: number;
  max: number;
  type: WaveType;
  phase: number;
}

export interface LfoGraph {
  osc: Tone.Oscillator;
  lfo: Tone.LFO;
}

/** The LFO's own value at time t, matching how Tone scales the -1 to 1 wave into min..max. */
export const lfoAt = (c: LfoCase, t: number): number => c.min + ((wave(c.type, c.rate, t, c.phase) + 1) / 2) * (c.max - c.min);

/** An LFO wired into an oscillator's frequency, one pass per case, with sliders in the full view. */
export function lfoPitch(stage: Stage, seconds: number, cases: readonly LfoCase[], yMin = 100, yMax = 900): ToneSpec<LfoGraph> {
  const view = trace(stage, seconds, { yMin, yMax, unit: 'Hz', caption: cases[0]!.caption });
  let cur = { ...cases[0]! };
  const apply = (g: LfoGraph): void => {
    g.lfo.set({ frequency: cur.rate, min: cur.min, max: cur.max, type: cur.type, phase: cur.phase });
  };
  return {
    build: () => {
      const osc = voice();
      const lfo = new Tone.LFO();
      lfo.connect(osc.frequency);
      return { osc, lfo };
    },
    play: (g, time) => {
      apply(g);
      g.lfo.start(time).stop(time + seconds);
      burst(g.osc, time, seconds);
      const c = { ...cur };
      view.show(time, [sampleFn((t) => lfoAt(c, t), seconds)], c.caption);
    },
    variants: cases.map((c) => ({
      label: c.label,
      apply: (g: LfoGraph) => {
        cur = { ...c };
        apply(g);
      },
    })),
    controls: (g, bar) => {
      slider(bar, 'speed', 0.5, 6, 0.5, cur.rate, (v) => (cur.rate = g.lfo.frequency.value = v), (v) => `${v} Hz`);
      slider(bar, 'min', 100, 500, 10, cur.min, (v) => (cur.min = g.lfo.min = v), (v) => `${v} Hz`);
      slider(bar, 'max', 300, 900, 10, cur.max, (v) => (cur.max = g.lfo.max = v), (v) => `${v} Hz`);
    },
    frame: (t) => view.frame(t),
  };
}
