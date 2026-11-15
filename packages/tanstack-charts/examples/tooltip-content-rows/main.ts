// tooltip.content: a title plus rows, with the primary point's row marked active
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a line: its own row is bold in the list.' });

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    focus: 'group-x',
    tooltip: {
      use: tooltip,
      content: (points, context) => ({
        title: `Requests, ${context.formatX(points[0]!.xValue)}`,
        rows: points.map((point) => ({
          label: point.groupLabel,
          value: `${context.formatY(point.yValue)}k`,
          color: point.color,
          active: point === context.primaryPoint,
        })),
      }),
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * t, 0.25 + 0.5 * Math.abs(Math.sin(t * 4))]);
  return () => stage.dispose();
};

export default mount;
