// The tooltip element is role=status, aria-live=polite: the readout shows what it would announce
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar, or focus the chart and use the arrow keys.' });
  const readout = stage.bar ? stage.readout() : null;
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Monthly revenue' }));
  stage.every(200, () => {
    const live = stage.box.querySelector('[role="status"]');
    const text = live?.textContent?.trim() ?? '';
    const line = live ? `role=status aria-live=${live.getAttribute('aria-live')}: "${text}"` : 'no status element yet';
    if (readout) readout.textContent = line;
    else stage.say(text ? `announced: ${text}` : '');
  });
  stage.ghost();
  return () => stage.dispose();
};

export default mount;
