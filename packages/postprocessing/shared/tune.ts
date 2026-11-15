// A parameter rig: sliders in the full view, a sweeping value readout in cards
import type { Stage } from './stage.ts';
import { overlay, slider } from './controls.ts';

export interface Param {
  name: string;
  min: number;
  max: number;
  step: number;
  value: number;
  /** Applies the value to the effect under test. */
  set(v: number): void;
  /** Cards sweep the value over [lo, hi] with this period (seconds); without it a card holds `value`. */
  sweep?: [lo: number, hi: number, period?: number];
  /** Cards step through these values instead, `every` seconds apart: for options that recompile a shader when set. */
  steps?: { values: number[]; every: number };
  /** Decimals shown in the readout. */
  digits?: number;
}

/** Back and forth between lo and hi once per `period` seconds. */
const wave = (t: number, lo: number, hi: number, period: number, phase = 0): number =>
  lo + (hi - lo) * 0.5 * (1 - Math.cos(((t + phase) / period) * Math.PI * 2));

/**
 * Builds a slider per parameter in the full view and an overlay readout in both views.
 * Returns `update(t)`: call it every frame; in a card it sweeps the parameters that have a `sweep`.
 */
export function tune(stage: Stage, params: Param[], title = ''): (t: number) => void {
  const label = overlay(stage.box);
  const values = params.map((p) => p.value);
  const show = (): void => {
    const lines = params.map((p, i) => `${p.name} ${values[i]!.toFixed(p.digits ?? 2)}`);
    label.textContent = (title ? `${title}\n` : '') + lines.join('\n');
  };
  params.forEach((p, i) => {
    p.set(p.value);
    if (stage.bar) {
      slider(stage.bar, p.name, p.min, p.max, p.step, p.value, (v) => {
        values[i] = v;
        p.set(v);
        show();
      });
    }
  });
  show();
  return (t) => {
    if (!stage.preview) return;
    params.forEach((p, i) => {
      if (p.steps) {
        const v = p.steps.values[Math.floor(t / p.steps.every) % p.steps.values.length]!;
        if (v !== values[i]) p.set((values[i] = v));
        return;
      }
      if (!p.sweep) return;
      values[i] = wave(t, p.sweep[0], p.sweep[1], p.sweep[2] ?? 6, i * 0.7);
      p.set(values[i]!);
    });
    show();
  };
}
