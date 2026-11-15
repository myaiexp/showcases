// tooltip.formatGroup: a heading and one line per series for group-x focus
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover: one heading, then a line per series.' });

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    focus: 'group-x',
    tooltip: {
      use: tooltip,
      formatGroup(points) {
        const date = points[0]?.xValue;
        const heading = date instanceof Date ? date.toLocaleDateString('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : String(date ?? '');
        return [heading, ...points.map((point) => `${point.groupLabel}: ${point.datum.value}k`)].join('\n');
      },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
