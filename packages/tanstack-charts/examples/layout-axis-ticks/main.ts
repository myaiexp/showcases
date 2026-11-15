// Tick candidates: choose one of count, spacing or explicit values; stubs and labels have their own options
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const rows = walk(rng(23), 50, 100, 5).map((value, i) => ({ id: `p${i}`, i, value }));
type Ticks = { count?: number; spacing?: number; values?: number[]; size?: number; format?: (v: number) => string };
const variants: readonly (readonly [Ticks, string])[] = [
  [{}, 'default candidates'],
  [{ count: 4 }, 'ticks: { count: 4 }'],
  [{ spacing: 40 }, 'ticks: { spacing: 40 } (pixels between candidates)'],
  [{ values: [0, 12, 25, 49] }, 'ticks: { values: [0, 12, 25, 49] } on x'],
  [{ size: 0 }, 'ticks: { size: 0 } (no stubs, labels and grid stay)'],
  [{ format: (v) => `#${v}` }, 'ticks: { format: v => `#${v}` }'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const build = (ticks: Ticks) =>
    defineChart({
      marks: [lineY(rows, { x: 'i', y: 'value', stroke: '#60a5fa' })],
      scales: {
        x: { scale: scaleLinear, grid: true, axis: { ticks } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: ticks.values ? {} : ticks } },
      },
    });
  const options = (ticks: Ticks) => ({ definition: build(ticks), height: stage.height, ariaLabel: 'Random walk' });
  const host = stage.own(mountChart(stage.box, options({})));
  const show = (ticks: Ticks, label: string): void => {
    host.update(options(ticks));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'ticks', variants.map(([t, l], i) => [i, l] as const), (i) => show(variants[i]![0], ''));
  else stage.cycle(variants, 1600, ([t, l]) => show(t, l));
  return () => stage.dispose();
};

export default mount;
