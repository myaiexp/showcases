// Correlation quick start: related terms around a centre point
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, relatedWords } from '../../shared/flow-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'correlation',
    data: [{ id: 'data', values: relatedWords() }],
    categoryField: 'word',
    valueField: 'sim',
    sizeField: 'pv',
    sizeRange: ctx.preview ? [6, 16] : [12, 30],
    innerRadius: '25%',
    outerRadius: '90%',
    centerLabel: { visible: true, position: 'center', style: { fill: '#fff', fontSize: ctx.preview ? 10 : 14, text: 'coffee' } },
    label: { visible: !ctx.preview, position: 'bottom', style: { fill: '#ddd', fontSize: 10 } },
  }));

  let seed = 3;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('data', relatedWords(++seed) as never);
  });

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
