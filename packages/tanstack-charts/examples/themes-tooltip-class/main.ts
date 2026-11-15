// tooltip.className: an application class on the tooltip element, styled in style.css
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the tooltip carries the revenue-tooltip class.' });
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#a78bfa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip: { use: tooltip, className: 'revenue-tooltip' },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Monthly revenue' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
