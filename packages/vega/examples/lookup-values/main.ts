// Lookup with values and default: copy a field from a second dataset, with a fallback for misses
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 340,
    height: 190,
    padding: 5,
    signals: [{ name: 'known', value: 5, bind: { input: 'range', min: 0, max: 6, step: 1 } }],
    data: [
      {
        name: 'names',
        values: [
          { id: 'A', label: 'Apples' }, { id: 'B', label: 'Bread' }, { id: 'C', label: 'Cheese' },
          { id: 'D', label: 'Dates' }, { id: 'E', label: 'Eggs' }, { id: 'F', label: 'Fish' },
        ],
        // Only the first `known` entries of the lookup table exist.
        transform: [{ type: 'window', ops: ['row_number'], as: ['n'] }, { type: 'filter', expr: 'datum.n <= known' }],
      },
      {
        name: 'sales',
        values: [
          { item: 'A', n: 28 }, { item: 'B', n: 55 }, { item: 'C', n: 43 },
          { item: 'C', n: 91 }, { item: 'D', n: 81 }, { item: 'F', n: 33 },
        ],
        // Look up each item in `names` by id, copy `label` only, and say '(unknown)' on a miss.
        transform: [{ type: 'lookup', from: 'names', key: 'id', fields: ['item'], values: ['label'], as: ['name'], default: '(unknown)' }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'band', domain: { data: 'sales', field: 'item' }, range: 'height', padding: 0.15 },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    title: { text: { signal: "known + ' of 6 names known'" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'sales' },
        encode: {
          update: {
            x: { value: 0 },
            x2: { scale: 'x', field: 'n' },
            y: { scale: 'y', field: 'item' },
            height: { scale: 'y', band: 1 },
            fill: { signal: "datum.name == '(unknown)' ? '#a55' : 'steelblue'" },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'sales' },
        encode: {
          update: {
            x: { value: 6 },
            y: { scale: 'y', field: 'item', band: 0.5 },
            text: { signal: "datum.item + ': ' + datum.name" },
            baseline: { value: 'middle' },
            fill: { value: '#fff' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'known', [6, 4, 2, 0, 3, 5], 1300);
  return () => stage.dispose();
};

export default mount;
