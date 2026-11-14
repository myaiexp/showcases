// Signal example helpers: a value-over-time trace, Param sampling, LFO shapes
import * as Tone from 'tone';
import { plot, type PlotOptions } from './curve-plot.ts';
import type { Stage } from './stage.ts';
import { bigLabel } from './widgets.ts';

export interface TraceOptions extends Omit<PlotOptions, 'ticks'> {
  /** Unit written after the big number. */
  unit?: string;
  digits?: number;
  /** Caption shown above the number until a pass sets its own. */
  caption?: string;
}

export interface Trace {
  /** Draws `lines` (the first carries the dot) when audio `time` is heard. */
  show(time: number, lines: readonly (readonly number[])[], caption?: string): void;
  /** Moves the dot and the big number; call from the spec's frame(). */
  frame(t: number): void;
}

const COLORS = ['#7aa2ff', '#ff8fb1', '#8fd18f'];

/**
 * A big readout plus a plot of a value over `seconds`. The lines must be computed inside
 * play() (a card disposes its nodes before the cues run); the cue only draws them.
 */
export function trace(stage: Stage, seconds: number, o: TraceOptions): Trace {
  const caption = document.createElement('div');
  caption.style.cssText = `font:12px/1.3 ui-monospace,monospace;color:var(--fg-2);text-align:center;min-height:16px${stage.preview ? ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis' : ''}`;
  caption.textContent = o.caption ?? '';
  stage.visual.append(caption);
  const value = bigLabel(stage.visual, '');
  const ticks = Array.from({ length: Math.floor(seconds) }, (_, i) => ({ x: (i + 1) / seconds, text: `${i + 1}s` }));
  const p = plot(stage, { ...o, ticks });
  let current: readonly (readonly number[])[] = [];
  const text = (v: number | undefined): string => (v === undefined ? '' : `${v.toFixed(o.digits ?? 0)}${o.unit ? ` ${o.unit}` : ''}`);
  return {
    show(time, lines, cap) {
      stage.show(time, () => {
        current = lines;
        if (cap !== undefined) caption.textContent = cap;
        p.set(lines.map((y, k) => ({ y, color: COLORS[k] ?? COLORS[0], dashed: k > 0 })));
        value.textContent = text(lines[0]?.[0]);
      });
    },
    frame(t) {
      const first = current[0];
      if (!first) return;
      const x = Math.min(1, Math.max(0, t / seconds));
      value.textContent = text(first[Math.round(x * (first.length - 1))]);
      p.render(x);
    },
  };
}

/** `n` samples of `f(t)` for t from 0 to `seconds`. */
export function sampleFn(f: (t: number) => number, seconds: number, n = 160): number[] {
  return Array.from({ length: n }, (_, i) => f((i / (n - 1)) * seconds));
}

/** `n` samples of a signal's scheduled value over `seconds` starting at audio time `start`. */
export function sampleParam(p: { getValueAtTime(t: number): unknown }, start: number, seconds: number, n = 160): number[] {
  return sampleFn((t) => Number(p.getValueAtTime(start + t)), seconds, n);
}

export type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

/** An LFO's wave, -1 to 1, X. */
export function wave(type: WaveType, rate: number, t: number, phase = 0): number {
  const x = (((t * rate - phase / 360) % 1) + 1) % 1;
  if (type === 'sine') return Math.sin(2 * Math.PI * x);
  if (type === 'square') return x < 0.5 ? 1 : -1;
  if (type === 'sawtooth') return x < 0.5 ? 2 * x : 2 * x - 2;
  return x < 0.25 ? 4 * x : x < 0.75 ? 2 - 4 * x : 4 * x - 4;
}

/** A quiet oscillator already plugged into the speakers. */
export function voice(type: WaveType = 'triangle', volume = -12, frequency = 440): Tone.Oscillator {
  return new Tone.Oscillator({ type, volume, frequency }).toDestination();
}

/** Starts `osc` at `time` for `seconds`, so each pass of a repeating phrase is self-contained. */
export function burst(osc: Tone.Oscillator, time: number, seconds: number): void {
  osc.start(time).stop(time + seconds);
}
