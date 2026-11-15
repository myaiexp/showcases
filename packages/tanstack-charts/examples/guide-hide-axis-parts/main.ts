// Axis switches: ticks false, ticks.size 0, line false, tickLabels false and axis false
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const rows = walk(rng(2), 40, 50, 4).map((value, i) => ({ id: `p${i}`, i, value }));
const variants = [
  ['default axis', {}],
  ['ticks: false', { ticks: false }],
  ['ticks: { size: 0 }', { ticks: { size: 0 } }],
  ['line: false', { line: false }],
  ['tickLabels: false', { tickLabels: false }],
  ['axis: false', false],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The grid stays on in every variant: it is independent of the axis.' });
  const build = (axis: (typeof variants)[number][1]) =>
    defineChart({
      marks: [lineY(rows, { x: 'i', y: 'value', stroke: '#a3e635', strokeWidth: 2 })],
      scales: { x: { scale: scaleLinear, grid: true, axis }, y: { scale: scaleLinear, nice: true, grid: true, axis } },
    });
  const options = (axis: (typeof variants)[number][1]) => ({ definition: build(axis), height: stage.height, ariaLabel: 'Random walk' });
  const host = stage.own(mountChart(stage.box, options(variants[0][1])));
  const show = (i: number): void => {
    host.update(options(variants[i]![1]));
    stage.say(variants[i]![0]);
  };
  if (stage.bar) select(stage.bar, 'axis', variants.map((v, i) => [i, v[0]] as const), show);
  else stage.cycle(variants, 1500, (_, i) => show(i));
  return () => stage.dispose();
};

export default mount;
