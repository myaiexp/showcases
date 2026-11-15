// A category axis for mixed string and number labels, with categoryorder
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['category', 'linear', '-'] as const;
const ORDERS = ['trace', 'category ascending', 'category descending', 'total descending', 'array'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  await Plotly.newPlot(
    stage.div,
    [{ x: ['A12', 'BC2', 109, '12F', 215, 304], y: [1, 6, 3, 5, 1, 4], type: 'bar', name: 'Team A', text: ['Apples', 'Pears', 'Peaches', 'Bananas', 'Pineapples', 'Cherries'] }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Inventory' },
      xaxis: { type: 'category', title: { text: stage.preview ? '' : 'Product Code' }, categoryarray: ['304', 'A12', '12F', 'BC2', '215', '109'] },
      yaxis: { range: [0, 7], title: { text: stage.preview ? '' : 'Number of Items in Stock' } },
    },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'xaxis.type', TYPES, 'category', (v) => void relayout(stage.div, { 'xaxis.type': v }));
    select(stage.bar, 'xaxis.categoryorder', ORDERS, 'trace', (v) => void relayout(stage.div, { 'xaxis.categoryorder': v }));
  }
  if (stage.preview) stage.every(1300, (i) => void relayout(stage.div, { 'xaxis.categoryorder': ORDERS[i % ORDERS.length] }));
  return () => stage.dispose();
};

export default mount;
