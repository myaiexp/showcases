// areaY without y1/y2: layers at the same x stack by series
import { areaY, defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { threeSeries } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = threeSeries(30, 21);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover: each point sits on the top edge of its layer.' });

  const definition = defineChart({
    marks: [areaY(rows, { x: 'date', y: 'value', z: 'series', fillOpacity: 0.55, stroke: 'currentColor', strokeWidth: 1 })],
    scales: {
      x: { scale: scaleUtc },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Total' } },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Three series stacked as areas' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
