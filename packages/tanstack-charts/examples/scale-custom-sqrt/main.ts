// A hand-written ChartScale: square-root mapping with its own ticks, invert and bandwidth
import { defineChart, dot, mountChart } from '@tanstack/charts';
import type { ChartScale, ResolvedScale } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(5);
const rows = Array.from({ length: 36 }, (_, i) => ({ id: `p${i}`, x: Math.round(random() * 100), y: Math.round(random() ** 3 * 1000) }));

/** Maps values from 0 to the data maximum through sqrt, so small values get more room. */
const sqrtScale: ChartScale = {
  id: 'custom-sqrt',
  resolve({ id, values, range, tickCount }): ResolvedScale {
    const max = Math.max(1, ...values.map(Number).filter(Number.isFinite));
    const [r0, r1] = range;
    const map = (v: unknown): number => r0 + (r1 - r0) * Math.sqrt(Math.max(0, Number(v)) / max);
    const raw = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100].map((k) => (k * max) / 100);
    const nice = raw.filter((_, i) => i % Math.max(1, Math.ceil(raw.length / Math.max(2, tickCount))) === 0).map((v) => Math.round(v));
    return {
      id,
      type: 'sqrt',
      domain: [0, max],
      map,
      invert: (p) => max * (((p - r0) / (r1 - r0)) ** 2),
      ticks: nice.map((value) => ({ value, label: String(value), position: map(value) })),
      bandwidth: 0,
    };
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the custom scale: small values get more vertical room under sqrt.' });
  const build = (custom: boolean) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', r: 4, fill: '#c084fc' })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: custom ? sqrtScale : scaleLinear, grid: true, ...(custom ? {} : { nice: true }) } },
    });
  const options = (custom: boolean) => ({ definition: build(custom), height: stage.height, ariaLabel: 'Scatter on a square-root y axis' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const apply = (v: boolean): void => {
    host.update(options(v));
    stage.say(v ? 'y: custom ChartScale (sqrt)' : 'y: scaleLinear');
  };
  if (stage.bar) checkbox(stage.bar, 'custom sqrt scale', true, apply);
  else stage.cycle([true, false], 2200, apply);
  return () => stage.dispose();
};

export default mount;
