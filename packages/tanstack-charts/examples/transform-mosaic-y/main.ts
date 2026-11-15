// mosaicY: column widths from category totals, cell heights from shares inside each column
import { colorLegend, defineChart, groupBy, mosaicY, mountChart, rect, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeResponses } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a cell: value, outer total and grand total are on the row.' });

  const counts = groupBy(makeResponses(), { by: { question: 'question', response: 'response' }, outputs: { count: { reduce: 'count' } } });
  const cells = mosaicY(counts, { x: 'question', y: 'response', value: 'count' });
  const firstCells = cells.filter((c) => c.y1 === 0);
  const definition = defineChart({
    marks: [
      rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'yValue', inset: 1 }),
      text(firstCells, { x: 'x', y: () => 0.04, text: 'xValue', fill: '#0b0b0f' }),
    ],
    scales: { x: { scale: scaleLinear, axis: false }, y: { scale: scaleLinear, grid: false, axis: { label: 'Share of the question' } } },
    color: { legend: colorLegend() },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Survey mosaic by question' }));
  readoutPanel(stage)(tableText(cells, ['xValue', 'yValue', 'value', 'xTotal', 'total', 'x1', 'x2', 'y1', 'y2'], 5));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
