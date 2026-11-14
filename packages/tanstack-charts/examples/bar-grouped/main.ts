// barY layout: group() makes a sub-band per series inside each category band
import { barY, colorLegend, defineChart, group, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sales } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar for its quarter and region.' });

  const chart = (padding: number) =>
    defineChart({
      svgAnimation: true,
      marks: [barY(sales, { x: 'quarter', y: 'revenue', color: 'region', layout: group({ padding }) })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue' } },
      },
      color: { legend: colorLegend() },
      tooltip,
    });

  const options = { definition: chart(0.1), height: stage.height, initialWidth: 640, ariaLabel: 'Revenue by quarter and region, grouped' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (p: number): void => host.update({ ...options, definition: chart(p) });

  if (stage.bar) slider(stage.bar, 'group padding', 0, 0.6, 0.05, 0.1, show);
  else {
    stage.cycle([0, 0.3, 0.6], 1800, show);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
