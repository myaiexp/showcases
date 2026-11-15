// color.domain and color.range on the built-in ordinal scale
import { barY, colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [{ status: 'healthy', n: 74 }, { status: 'warning', n: 19 }, { status: 'critical', n: 7 }];
const variants = [
  [['healthy', 'warning', 'critical'], ['#16a34a', '#f59e0b', '#dc2626'], 'domain in severity order, status colors'],
  [['critical', 'warning', 'healthy'], ['#16a34a', '#f59e0b', '#dc2626'], 'domain reversed: the same range lands on other values'],
  [['healthy', 'warning', 'critical'], ['#93c5fd', '#3b82f6', '#1e3a8a'], 'one hue, light to dark'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the domain order or the range and the legend follows.' });
  const build = (i: number) =>
    defineChart({
      marks: [barY(rows, { x: 'status', y: 'n', color: 'status' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { domain: variants[i]![0], range: variants[i]![1], legend: colorLegend({ label: 'Status' }) },
    });
  const options = (i: number) => ({ definition: build(i), height: stage.height, ariaLabel: 'Systems by status' });
  const host = stage.own(mountChart(stage.box, options(0)));
  const show = (i: number): void => {
    host.update(options(i));
    stage.say(variants[i]![2]);
  };
  if (stage.bar) select(stage.bar, 'color', variants.map((v, i) => [i, v[2]] as const), show);
  else stage.cycle(variants, 2200, (_, i) => show(i));
  return () => stage.dispose();
};

export default mount;
