// mosaicY xOrder and yOrder: explicit category order against first-seen order
import { colorLegend, defineChart, groupBy, mosaicY, rect, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { makeResponses, scale } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const counts = groupBy(makeResponses(), { by: { question: 'question', response: 'response' }, outputs: { count: { reduce: 'count' } } });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (ordered: boolean) => {
    const cells = mosaicY(counts, {
      x: 'question',
      y: 'response',
      value: 'count',
      ...(ordered ? { xOrder: ['Team', 'Pay', 'Hours', 'Tools'], yOrder: [...scale] } : {}),
    });
    return defineChart({
      marks: [
        rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'yValue', inset: 1 }),
        text(cells.filter((c) => c.y1 === 0), { x: 'x', y: () => 0.04, text: 'xValue', fill: '#0b0b0f' }),
      ],
      scales: { x: { scale: scaleLinear, axis: false }, y: { scale: scaleLinear, grid: false } },
      color: ordered ? { domain: [...scale], range: ['#f87171', '#94a3b8', '#4ade80'], legend: colorLegend() } : { legend: colorLegend() },
    });
  };
  const states = [[false, 'first-seen order'], [true, 'xOrder and yOrder given']] as const;
  lab(stage, { label: 'order', ariaLabel: 'Survey mosaic with category order', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
