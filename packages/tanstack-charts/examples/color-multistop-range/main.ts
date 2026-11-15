// color.range with three colors on a D3 linear factory: stops are spread evenly over the extent
import { colorGradientLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleLinear as d3Linear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(61);
const rows = Array.from({ length: 70 }, (_, i) => ({ id: `p${i}`, x: random() * 100, y: random() * 100, change: Math.round((random() - 0.5) * 40) }));
const ranges = [
  [['#1d4ed8', '#f1f5f9', '#b91c1c'], 'blue, near white, red'],
  [['#fde047', '#f97316', '#7f1d1d'], 'yellow, orange, maroon'],
  [['#0f172a', '#22d3ee'], 'two stops'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With three stops the middle color sits at the middle of the extent.' });
  const build = (i: number) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', color: 'change', r: 6, stroke: '#64748b', strokeWidth: 0.5 })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { scale: d3Linear, range: ranges[i]![0], legend: colorGradientLegend({ label: 'Change (%)', width: 240, placement: 'bottom' }) },
    });
  const options = (i: number) => ({ definition: build(i), height: stage.height, ariaLabel: 'Scatter colored by change' });
  const host = stage.own(mountChart(stage.box, options(0)));
  const show = (i: number): void => {
    host.update(options(i));
    stage.say(ranges[i]![1]);
  };
  if (stage.bar) select(stage.bar, 'range', ranges.map((r, i) => [i, r[1]] as const), show);
  else stage.cycle(ranges, 2000, (_, i) => show(i));
  return () => stage.dispose();
};

export default mount;
