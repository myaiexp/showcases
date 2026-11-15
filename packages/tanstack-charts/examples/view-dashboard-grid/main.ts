// One composed figure: bar, line, scatter and donut views in a 2 x 2 grid with one tooltip
import { barY, defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { composeViews, grid } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { makeDots, makeSeries, quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const totals = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => ({ q, total: quarters.filter((r) => r.quarter === q).reduce((s, r) => s + r.revenue, 0) }));
const series = makeSeries(40).filter((r) => r.series === 'alpha');
const dots = makeDots(60);
const mix = quarters.filter((r) => r.quarter === 'Q4');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One tooltip serves all four views.' });

  const bars = defineChart({
    marks: [barY(totals, { x: 'q', y: 'total', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.25) }, y: { scale: scaleLinear, nice: true, grid: true } },
    margin: { top: 10, right: 10, bottom: 24, left: 34 },
  });
  const trend = defineChart({
    marks: [lineY(series, { x: 'day', y: 'value', stroke: '#fbbf24', strokeWidth: 2 })],
    scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    margin: { top: 10, right: 10, bottom: 24, left: 34 },
  });
  const scatter = defineChart({
    marks: [dot(dots, { x: 'x', y: 'y', color: 'group', r: 3 })],
    scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    margin: { top: 10, right: 10, bottom: 24, left: 34 },
  });
  const donut = defineChart({
    marks: [polar({ inset: 6, marks: [radialArc(pie(mix, { value: 'revenue' }), { innerRadius: ({ radius }) => radius * 0.55, color: 'product', key: 'product' })], scales: { angle: null, radius: null } })],
    scales: { x: null, y: null },
    guides: false,
    margin: 0,
  });

  const composed = composeViews({
    views: { bars, trend, scatter, donut },
    layout: grid({
      rows: [{ id: 'top', grow: 1 }, { id: 'bottom', grow: 1 }],
      columns: [{ id: 'left', grow: 1 }, { id: 'right', grow: 1 }],
      gap: 10,
      cells: { bars: { row: 'top', column: 'left' }, trend: { row: 'top', column: 'right' }, scatter: { row: 'bottom', column: 'left' }, donut: { row: 'bottom', column: 'right' } },
    }),
  });
  const definition = defineChart(composed, { tooltip: { use: tooltip, format: (point) => JSON.stringify(point.datum) } });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue, trend, scatter and mix in one figure' }));
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * t, 0.25]);
  return () => stage.dispose();
};

export default mount;
