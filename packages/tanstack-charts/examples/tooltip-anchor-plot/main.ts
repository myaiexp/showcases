// anchor: { x: 'plot-center', y: 'plot-top' }: a fixed tooltip panel with a placement fallback list
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tooltip does not move; only its rows change.' });

  const definition = defineChart({
    marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
    scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } },
    focus: 'group-x',
    tooltip: { use: tooltip, anchor: { x: 'plot-center', y: 'plot-top' }, placement: ['top', 'right', 'left', 'bottom'], offset: 12 },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
