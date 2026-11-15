// Mark styling: fill, stroke, dashes and radius, fixed or computed from each row
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = revenue.map((r, i) => ({ ...r, forecast: i >= 4 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Forecast months (May, Jun) use a dashed outline and a light fill.' });
  const build = (rounded: boolean) =>
    defineChart({
      marks: [
        barY(rows, {
          x: 'month',
          y: 'revenue',
          fill: (d) => (d.forecast ? '#60a5fa' : '#2563eb'),
          fillOpacity: 0.85,
          stroke: '#93c5fd',
          strokeWidth: 2,
          strokeDasharray: (d) => (d.forecast ? '5 4' : '0'),
          radius: rounded ? 8 : 0,
        }),
      ],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  const options = (rounded: boolean) => ({ definition: build(rounded), height: stage.height, ariaLabel: 'Monthly revenue, May and June are forecast' });
  const host = stage.own(mountChart(stage.box, options(true)));
  if (stage.bar) checkbox(stage.bar, 'rounded corners', true, (v) => host.update(options(v)));
  else stage.cycle([true, false], 2000, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
