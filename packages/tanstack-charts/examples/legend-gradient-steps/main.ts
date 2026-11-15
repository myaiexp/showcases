// colorGradientLegend: steps controls how finely the numeric ramp is sampled
import { colorGradientLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { scatter } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(9, 70);
const ramp = (t: number): string => `hsl(${Math.round(280 - 240 * t)} 80% ${Math.round(35 + 30 * t)}%)`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fewer steps show the samples the ramp is built from.' });
  const build = (steps: number) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', color: 'value', r: 5 })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { scale: () => scaleSequential(ramp), legend: colorGradientLegend({ label: 'Density', steps, width: 260, format: (v) => v.toFixed(1), placement: 'bottom' }) },
    });
  const options = (steps: number) => ({ definition: build(steps), height: stage.height, ariaLabel: 'Scatter colored by density' });
  const host = stage.own(mountChart(stage.box, options(48)));
  if (stage.bar) slider(stage.bar, 'steps', 2, 64, 1, 48, (v) => host.update(options(v)));
  else stage.cycle([48, 6, 3, 2], 1500, (s) => { host.update(options(s)); stage.say(`steps: ${s}`); });
  return () => stage.dispose();
};

export default mount;
