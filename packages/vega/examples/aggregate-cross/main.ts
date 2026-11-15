// Aggregate cross: true adds a zero-count row for every group combination missing from the data
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const sizes = ['small', 'medium', 'large'];
const colors = ['red', 'green', 'blue', 'gold'];
// Only some size and colour combinations occur in the data.
const orders = [
  ['small', 'red'], ['small', 'red'], ['small', 'green'], ['medium', 'green'], ['medium', 'green'],
  ['medium', 'blue'], ['large', 'blue'], ['large', 'blue'], ['large', 'blue'], ['small', 'gold'],
].map(([size, color]) => ({ size, color }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 210,
    padding: 5,
    signals: [{ name: 'cross', value: false, bind: { input: 'checkbox' } }],
    data: [
      { name: 'orders', values: orders },
      {
        name: 'cells',
        source: 'orders',
        // cross: true also generates the missing pairs, with a count of 0.
        transform: [{ type: 'aggregate', groupby: ['size', 'color'], cross: { signal: 'cross' } }],
      },
    ],
    scales: [
      { name: 'x', type: 'band', domain: colors, range: 'width', padding: 0.08 },
      { name: 'y', type: 'band', domain: sizes, range: 'height', padding: 0.08 },
      { name: 'fill', type: 'linear', domain: [0, 3], range: ['#1f2a44', 'orange'] },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y' },
    ],
    title: { text: { signal: "'cross: ' + cross + ' (' + length(data('cells')) + ' output rows)'" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'cells' },
        encode: {
          update: {
            x: { scale: 'x', field: 'color' },
            y: { scale: 'y', field: 'size' },
            width: { scale: 'x', band: 1 },
            height: { scale: 'y', band: 1 },
            fill: { scale: 'fill', field: 'count' },
            stroke: { value: '#667' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'cells' },
        encode: {
          update: {
            x: { scale: 'x', field: 'color', band: 0.5 },
            y: { scale: 'y', field: 'size', band: 0.5 },
            text: { field: 'count' },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            fill: { value: '#fff' },
            fontSize: { value: 16 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'cross', [true, false], 1700);
  return () => stage.dispose();
};

export default mount;
