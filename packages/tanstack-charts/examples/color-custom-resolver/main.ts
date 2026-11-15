// color.resolver: a hand-written ChartColorScale that buckets numbers and reports its thresholds to the legend
import { colorLegend, defineChart, dot, mountChart } from '@tanstack/charts';
import type { ChartColorScale } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { scatter } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(40, 70);

const buckets: ChartColorScale = {
  id: 'three-buckets',
  resolve: ({ theme }) => {
    const cuts = [40, 80];
    const range = [theme.palette[2] ?? '#4ade80', theme.palette[1] ?? '#fb923c', theme.palette[4] ?? '#f87171'];
    return {
      type: 'buckets',
      kind: 'threshold',
      domain: cuts,
      range,
      thresholds: cuts,
      map: (value) => {
        const v = Number(value);
        return v < cuts[0]! ? range[0]! : v < cuts[1]! ? range[1]! : range[2]!;
      },
    };
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Low below 40, medium to 80, high above, from the theme palette.' });
  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', color: 'value', r: 5 })],
    scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    color: { resolver: buckets, legend: colorLegend({ label: 'Value', placement: 'bottom' }) },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Scatter colored into three buckets' }));
  return () => stage.dispose();
};

export default mount;
