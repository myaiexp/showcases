// scaleThreshold: authored cut points in color.domain give the legend exact bin boundaries
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleThreshold } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { scatter } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(21, 80).map((r) => ({ ...r, incidents: Math.round(r.value / 3) }));
const colors = ['#eff6ff', '#bfdbfe', '#60a5fa', '#1d4ed8'];
const cuts: readonly (readonly [number[], string])[] = [[[5, 12, 24], 'cuts 5, 12, 24'], [[10, 20, 30], 'cuts 10, 20, 30'], [[3, 6, 9], 'cuts 3, 6, 9']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the cut points: the legend bins follow them.' });
  const build = (domain: number[]) =>
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', color: 'incidents', r: 5, stroke: '#1e3a8a', strokeWidth: 0.5 })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { scale: scaleThreshold<number, string>, domain, range: colors, legend: colorLegend({ label: 'Incidents', placement: 'bottom', format: (v) => v.toFixed(0) }) },
    });
  const options = (domain: number[]) => ({ definition: build(domain), height: stage.height, ariaLabel: 'Scatter colored by incident bin' });
  const host = stage.own(mountChart(stage.box, options(cuts[0]![0])));
  const show = (i: number): void => {
    host.update(options(cuts[i]![0]));
    stage.say(cuts[i]![1]);
  };
  if (stage.bar) select(stage.bar, 'thresholds', cuts.map((c, i) => [i, c[1]] as const), show);
  else stage.cycle(cuts, 2000, (_, i) => show(i));
  return () => stage.dispose();
};

export default mount;
