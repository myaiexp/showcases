// anchor: 'group-center' with group-x focus: the box follows the month, not the series
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move up and down over one month: the tooltip stays put.' });

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    focus: 'group-x',
    tooltip: { use: tooltip, anchor: 'group-center', placement: ['top', 'right', 'left', 'bottom'], sort: 'color-domain' },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * t, 0.15 + 0.7 * Math.abs(Math.sin(t * 14))]);
  return () => stage.dispose();
};

export default mount;
