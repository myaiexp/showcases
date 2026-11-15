// Domain data reference with sort: categories ordered by an aggregate of another field
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(21);
  const names = ['alder', 'birch', 'cedar', 'fir', 'larch', 'maple', 'oak'];
  const values = names.flatMap((c, k) => Array.from({ length: 6 }, () => ({ c, v: Math.round(15 + k * 7 + rand() * 40 + (k % 3) * 8 * rand()) })));

  const spec: Spec = {
    width: 440, height: 200, padding: 5,
    signals: [
      { name: 'op', value: 'median', bind: { input: 'select', options: ['median', 'mean', 'max', 'min'], name: 'sort op' } },
      { name: 'order', value: 'descending', bind: { input: 'select', options: ['ascending', 'descending'] } },
    ],
    data: [{ name: 'table', values }],
    scales: [
      // Distinct categories, ordered by an aggregate of v computed per category.
      {
        name: 'x', type: 'band', range: 'width', padding: 0.2,
        domain: { data: 'table', field: 'c', sort: { op: { signal: 'op' }, field: 'v', order: { signal: 'order' } } },
      },
      { name: 'y', type: 'linear', domain: { data: 'table', field: 'v' }, nice: true, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2 }],
    marks: [
      {
        type: 'symbol', from: { data: 'table' },
        encode: { update: { x: { scale: 'x', field: 'c', band: 0.5 }, y: { scale: 'y', field: 'v' }, size: { value: 70 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.8 } } },
      },
      { type: 'text', encode: { update: { x: { value: 4 }, y: { value: 8 }, text: { signal: "'sorted by ' + op + ' of v, ' + order" }, fill: { value: '#ddd' } } } },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ op: 'median', order: 'descending' }, { op: 'median', order: 'ascending' }, { op: 'max', order: 'descending' }, { op: 'min', order: 'ascending' }], 1700);
  return () => stage.dispose();
};

export default mount;
