// Explicit mark ids let a conditionally rendered layer keep its identity while others come and go
import { defineChart, lineY, mountChart, type ChartMark } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { regionalSeries, regions } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const all = regionalSeries(12, 20);
const colors: Record<string, string> = { North: '#60a5fa', South: '#fb923c', West: '#4ade80' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle a region: the other lines keep their ids and animate in place.' });
  const shown = new Set<string>(regions);

  const build = () =>
    defineChart({
      svgAnimation: true,
      marks: regions
        .filter((region) => shown.has(region))
        .map((region) => lineY(all.filter((r) => r.region === region), { id: `line-${region}`, x: 'date', y: 'value', stroke: colors[region], strokeWidth: 2 }) as ChartMark<any, any, any>),
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear().domain([0, 160]), grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Regional lines' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    for (const region of regions) {
      checkbox(stage.bar, region, true, (on) => {
        if (on) shown.add(region);
        else shown.delete(region);
        refresh();
      });
    }
  } else {
    stage.cycle([regions, ['North', 'West'], ['West']] as const, 1600, (subset) => {
      shown.clear();
      subset.forEach((r) => shown.add(r));
      refresh();
    });
  }
  return () => stage.dispose();
};

export default mount;
