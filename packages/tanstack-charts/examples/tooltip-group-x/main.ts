// focus: 'group-x': one tooltip heading, one row per series at that month
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover: all three series at the month are listed.' });

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests (thousands)' } },
    },
    focus: 'group-x',
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
