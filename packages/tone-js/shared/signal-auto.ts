// Spec builder for examples that schedule an oscillator's frequency and plot it
import type * as Tone from 'tone';
import { select } from './controls.ts';
import { burst, sampleParam, trace, voice } from './signal-kit.ts';
import type { Stage, ToneSpec } from './stage.ts';

export interface AutoCase {
  label: string;
  /** Written above the number while this case plays. */
  caption: string;
  /** Schedules the automation on the frequency signal, from audio time `time`. */
  schedule(f: Tone.Signal<'frequency'>, time: number): void;
}

export interface AutoOptions {
  seconds: number;
  yMin: number;
  yMax: number;
  guides?: readonly number[];
  /** Hz the signal holds before the case schedules anything (default 200). */
  start?: number;
  cases: readonly AutoCase[];
}

/** An oscillator whose frequency signal is automated by the chosen case, drawn as it plays. */
export function automation(stage: Stage, o: AutoOptions): ToneSpec<Tone.Oscillator> {
  const view = trace(stage, o.seconds, { yMin: o.yMin, yMax: o.yMax, guides: o.guides, unit: 'Hz', caption: o.cases[0]!.caption });
  let cur = o.cases[0]!;
  return {
    build: () => voice(),
    play: (osc, time) => {
      const f = osc.frequency;
      f.cancelScheduledValues(time);
      f.setValueAtTime(o.start ?? 200, time);
      cur.schedule(f, time);
      // Read the curve now: a card disposes the oscillator before its cues run.
      view.show(time, [sampleParam(f, time, o.seconds)], cur.caption);
      burst(osc, time, o.seconds);
    },
    variants: o.cases.map((c) => ({
      label: c.label,
      apply: () => {
        cur = c;
      },
    })),
    controls: (_, bar) =>
      select(bar, 'schedule', o.cases.map((c) => c.label), (l) => {
        cur = o.cases.find((c) => c.label === l) ?? cur;
      }),
    frame: (t) => view.frame(t),
  };
}
