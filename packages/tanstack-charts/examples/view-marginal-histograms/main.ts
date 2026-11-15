// composeViews: a scatter and two histograms in a grid, linked with shareX and shareY
import { binX, binY, defineChart, dot, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { composeViews, grid, shareX, shareY } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { makeDots } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const dots = makeDots(300);
const topBins = binX(dots, { value: 'x', thresholds: 25, domain: [0, 100] });
const sideBins = binY(dots, { value: 'y', thresholds: 20, domain: [0, 80] });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const scatterDefinition = defineChart({
    marks: [dot(dots, { x: 'x', y: 'y', color: 'group', r: 3, fillOpacity: 0.7 })],
    scales: {
      x: { scale: scaleLinear().domain([0, 100]), axis: { label: 'x' } },
      y: { scale: scaleLinear().domain([0, 80]), grid: true, axis: { label: 'y' } },
    },
    margin: { top: 4, right: 14, bottom: 36, left: 40 },
  });
  const xHistogramDefinition = defineChart({
    marks: [rect(topBins, { x1: 'x1', x2: 'x2', y1: () => 0, y2: 'value', fill: '#64748b', inset: 0.5 })],
    scales: { x: { scale: scaleLinear().domain([0, 100]), axis: false }, y: { scale: scaleLinear().domain([0, 30]), axis: false } },
    margin: { top: 4, right: 14, bottom: 0, left: 40 },
  });
  const yHistogramDefinition = defineChart({
    marks: [rect(sideBins, { y1: 'y1', y2: 'y2', x1: () => 0, x2: 'value', fill: '#64748b', inset: 0.5 })],
    scales: { x: { scale: scaleLinear().domain([0, 40]), axis: false }, y: { scale: scaleLinear().domain([0, 80]), axis: false } },
    margin: { top: 4, right: 4, bottom: 36, left: 0 },
  });

  const definition = composeViews({
    views: { main: scatterDefinition, top: xHistogramDefinition, right: yHistogramDefinition },
    layout: grid({
      rows: [{ id: 'top', size: 72 }, { id: 'main', grow: 1 }],
      columns: [{ id: 'main', grow: 1 }, { id: 'right', size: 72 }],
      gap: 8,
      cells: {
        main: { row: 'main', column: 'main' },
        top: { row: 'top', column: 'main' },
        right: { row: 'main', column: 'right' },
      },
    }),
    links: [shareX('top', 'main'), shareY('right', 'main')],
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Scatter plot with marginal histograms' }));
  stage.say('Three chart definitions, one host: the bins share the scatter plot\'s scales.');
  return () => stage.dispose();
};

export default mount;
