// sort decides the order of segments inside every stack, by series name or by value
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(23);
  const values = 'ABCDEF'.split('').flatMap((cat) =>
    ['p', 'q', 'r', 's'].map((s) => ({ cat, s, v: Math.round(3 + rand() * 14) })),
  );

  const spec: Spec = {
    width: 400,
    height: 230,
    padding: 5,
    signals: [
      { name: 'sortBy', value: 'v', bind: { input: 'radio', options: ['s', 'v'] } },
      { name: 'sortOrder', value: 'ascending', bind: { input: 'radio', options: ['ascending', 'descending'] } },
    ],
    data: [
      {
        name: 'table',
        values,
        transform: [
          { type: 'stack', groupby: ['cat'], field: 'v', sort: { field: { signal: 'sortBy' }, order: { signal: 'sortOrder' } } },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'cat' }, range: 'width', padding: 0.1 },
      { name: 'y', type: 'linear', domain: { data: 'table', field: 'y1' }, range: 'height', nice: true },
      { name: 'color', type: 'ordinal', domain: ['p', 'q', 'r', 's'], range: { scheme: 'category10' } },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y' },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'cat' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'y0' },
            y2: { scale: 'y', field: 'y1' },
            fill: { scale: 'color', field: 's' },
            stroke: { value: '#1a1a1a' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { sortBy: 's', sortOrder: 'ascending' },
    { sortBy: 'v', sortOrder: 'ascending' },
    { sortBy: 'v', sortOrder: 'descending' },
    { sortBy: 's', sortOrder: 'descending' },
  ], 1600);
  return () => stage.dispose();
};

export default mount;
