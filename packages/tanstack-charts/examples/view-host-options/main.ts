// defineChart(composed, { tooltip, keyboard, maxFocusDistance }): one host for every child view
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { composeViews, grid } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { makeDots, makeSeries } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const dots = makeDots(60);
const series = makeSeries(40).filter((r) => r.series === 'alpha');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point in either view, or tab into the chart and use the arrow keys.' });

  const left = defineChart({
    marks: [dot(dots, { x: 'x', y: 'y', color: 'group', r: 4 })],
    scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  const right = defineChart({
    marks: [lineY(series, { x: 'day', y: 'value', stroke: '#fbbf24', strokeWidth: 2, points: true })],
    scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  const composed = composeViews({
    views: { left, right },
    layout: grid({
      rows: [{ id: 'r', grow: 1 }],
      columns: [{ id: 'a', grow: 1 }, { id: 'b', grow: 1 }],
      gap: 12,
      cells: { left: { row: 'r', column: 'a' }, right: { row: 'r', column: 'b' } },
    }),
  });
  const definition = defineChart(composed, { tooltip, keyboard: true, maxFocusDistance: 40 });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Scatter and line views in one chart' }));
  if (stage.preview) stage.ghost((t) => [0.15 + 0.7 * t, 0.5]);
  return () => stage.dispose();
};

export default mount;
