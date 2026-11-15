// Aggregate with only a groupby: one output row per group, holding its count
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rand = rng(11);
const kinds = ['pine', 'oak', 'birch', 'elm', 'ash'];
const trees = Array.from({ length: 70 }, () => ({
  kind: kinds[Math.floor(rand() ** 1.6 * kinds.length)],
  height: Math.round(10 + rand() * 70),
}));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 200,
    padding: 5,
    signals: [{ name: 'minHeight', value: 0, bind: { input: 'range', min: 0, max: 70, step: 5 } }],
    data: [
      { name: 'trees', values: trees },
      {
        // The transform: group by kind, no fields or ops, so each group gets a `count`.
        name: 'counts',
        source: 'trees',
        transform: [
          { type: 'filter', expr: 'datum.height >= minHeight' },
          { type: 'aggregate', groupby: ['kind'] },
        ],
      },
      rowsOf('rows', 'counts'),
    ],
    scales: [
      { name: 'x', type: 'band', domain: kinds, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 30], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', title: 'count' },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'counts' },
        encode: {
          update: {
            x: { scale: 'x', field: 'kind' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'count' },
            y2: { scale: 'y', value: 0 },
            fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'counts' },
        encode: {
          update: {
            x: { scale: 'x', field: 'kind', band: 0.5 },
            y: { scale: 'y', field: 'count', offset: -3 },
            text: { field: 'count' },
            align: { value: 'center' },
            fill: { value: '#ddd' },
          },
        },
      },
      ...tableMarks('rows', [{ field: 'kind', width: 56 }, { field: 'count' }]),
    ],
  };

  const view = await stage.render(spec);
  // Raising the minimum height thins the trees out; groups that empty vanish from the output.
  cycle(stage, view, 'minHeight', [0, 20, 40, 55, 65, 30], 1300);
  return () => stage.dispose();
};

export default mount;
