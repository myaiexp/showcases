// tooltip.items: channel, field and derived rows, in the order of the array
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar: the rows follow the items array, with change left out when it is zero.' });

  const definition = defineChart({
    marks: [barY(weeks, { x: 'week', y: 'value', key: 'id' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip: {
      use: tooltip,
      items: [
        { channel: 'y', label: 'Users', text: (point) => `${point.yValue.toLocaleString()} active` },
        { field: 'status', label: 'Status' },
        { id: 'change', label: 'Week on week', text: (point) => (point.datum.change === 0 ? null : `${point.datum.change > 0 ? '+' : ''}${Math.round(point.datum.change * 100)}%`) },
        'x',
      ],
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly users with status' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
