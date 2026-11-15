// colorLegend over a continuous scale: sampled ramp with a title, width and endpoint formatter
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { scatter } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(3, 70).map((r) => ({ ...r, requests: Math.round(r.value * 14) }));
const ramp = (t: number): string => `hsl(${Math.round(200 - 170 * t)} 85% ${Math.round(40 + 22 * t)}%)`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the preferred legend width.' });
  const build = (width: number) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', color: 'requests', r: 5 })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: {
        scale: () => scaleSequential(ramp),
        legend: colorLegend({ label: 'Requests per minute', width, format: (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${Math.round(v)}`) }),
      },
    });
  const options = (width: number) => ({ definition: build(width), height: stage.height, ariaLabel: 'Scatter colored by request rate' });
  const host = stage.own(mountChart(stage.box, options(240)));
  if (stage.bar) slider(stage.bar, 'legend width', 80, 420, 10, 240, (v) => host.update(options(v)), (v) => `${v}px`);
  else stage.cycle([260, 120], 2000, (w) => host.update(options(w)));
  return () => stage.dispose();
};

export default mount;
