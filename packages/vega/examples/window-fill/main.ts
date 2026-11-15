// Window prev_value and next_value: fill missing values from the nearest present neighbour
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const ops = ['prev_value', 'next_value'];
// Gaps are null or absent.
const series = [
  { key: 0, value: 20 }, { key: 1, value: null }, { key: 2, value: null }, { key: 3, value: 55 },
  { key: 4 }, { key: 5, value: 35 }, { key: 6, value: null }, { key: 7, value: 80 },
  { key: 8, value: 62 }, { key: 9 }, { key: 10 }, { key: 11, value: 40 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 180,
    padding: 5,
    signals: [{ name: 'op', value: 'prev_value', bind: { input: 'select', options: ops } }],
    data: [
      { name: 'raw', values: series },
      {
        name: 'filled',
        source: 'raw',
        // The same field in and out: present values stay, gaps take the previous or next present one.
        transform: [{ type: 'window', sort: { field: 'key' }, ops: [{ signal: 'op' }], fields: ['value'], as: ['fill'] }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 11], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickMinStep: 1, title: 'key' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "op + ': hollow rings are filled gaps'" }, color: '#ddd' },
    marks: [
      {
        type: 'line',
        from: { data: 'filled' },
        encode: {
          update: {
            x: { scale: 'x', field: 'key' },
            y: { scale: 'y', field: 'fill' },
            stroke: { value: 'steelblue' },
            strokeWidth: { value: 2 },
            interpolate: { value: 'step-after' },
            defined: { signal: 'isValid(datum.fill)' },
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'filled' },
        encode: {
          update: {
            x: { scale: 'x', field: 'key' },
            y: { scale: 'y', field: 'fill' },
            size: { value: 90 },
            stroke: { value: 'orange' },
            strokeWidth: { value: 2 },
            fill: { signal: "isValid(datum.value) ? 'orange' : 'transparent'" },
            opacity: { signal: 'isValid(datum.fill) ? 1 : 0' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'op', ops, 2000);
  return () => stage.dispose();
};

export default mount;
