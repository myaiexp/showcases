// anchor as a resolver: x from the resolved x scale, y from the plot bounds
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tooltip sits on the x axis, under the focused week.' });

  const definition = defineChart({
    marks: [lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, grid: true },
    },
    focus: 'nearest-x',
    tooltip: {
      use: tooltip,
      anchor: (_points, { focus, plot, scales }) => {
        const x = scales.x;
        if (!x) return null;
        return { x: (x.viewport?.map ?? x.map)(focus.primary.xValue), y: plot.y + plot.height };
      },
      placement: 'top',
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly active users' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
