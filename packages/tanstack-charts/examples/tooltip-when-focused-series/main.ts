// whenFocused(lineY(...), { match: 'series' }): a bold overlay for the hovered series only
import { defineChart, lineY, mountChart, whenFocused } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a line: it thickens and the others stay thin.' });

  const definition = defineChart({
    marks: [
      lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', strokeWidth: 1.5, strokeOpacity: 0.55 }),
      whenFocused(lineY(traffic, { x: 'date', y: 'value', color: 'series', strokeWidth: 4.5 }), { match: 'series' }),
    ],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests (thousands)' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * t, 0.2 + 0.55 * Math.abs(Math.sin(t * 3))]);
  return () => stage.dispose();
};

export default mount;
