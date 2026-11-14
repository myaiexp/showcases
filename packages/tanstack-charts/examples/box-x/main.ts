// boxX: horizontal boxplots, observation on x and category on y
import { boxX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ 'Checkout page': [420, 90, 70], 'Search results': [310, 150, 70], 'Account settings': [260, 40, 50] }, 29);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a box or outlier dot.' });

  const definition = defineChart({
    marks: [boxX(rows, { x: 'value', y: 'group', fill: '#fb923c', fillOpacity: 0.35, stroke: '#fb923c' })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Load time (ms)' } },
      y: { scale: () => scaleBand<string>().padding(0.4) },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Page load times as horizontal boxplots' }));
  if (stage.preview) stage.ghost((t) => [0.5, 0.1 + 0.8 * t]);
  return () => stage.dispose();
};

export default mount;
