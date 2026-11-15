// mosaicX: row heights from category totals, widths from shares inside each row
import { colorLegend, defineChart, groupBy, mosaicX, mountChart, rect, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeResponses } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a cell for its count.' });

  const counts = groupBy(makeResponses(), { by: { question: 'question', response: 'response' }, outputs: { count: { reduce: 'count' } } });
  const cells = mosaicX(counts, { x: 'response', y: 'question', value: 'count' });
  const firstCells = cells.filter((c) => c.x1 === 0);
  const definition = defineChart({
    marks: [
      rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'xValue', inset: 1 }),
      text(firstCells, { x: () => 0.01, y: 'y', text: 'yValue', anchor: 'start', fill: '#0b0b0f' }),
    ],
    scales: { x: { scale: scaleLinear, grid: false, axis: { label: 'Share of the question' } }, y: { scale: scaleLinear, axis: false } },
    color: { legend: colorLegend() },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Survey mosaic by response' }));
  stage.say('Row height follows how many people answered each question.');
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
