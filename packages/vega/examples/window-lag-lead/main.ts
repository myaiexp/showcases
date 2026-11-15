// Window lag and lead: read the value a number of rows before or after the current one
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 180,
    padding: 5,
    signals: [{ name: 'offset', value: 1, bind: { input: 'range', min: 1, max: 5, step: 1 } }],
    data: [
      {
        name: 'series',
        values: [30, 48, 41, 66, 72, 58, 35, 44, 80, 70, 52, 63].map((v, i) => ({ i, v })),
        // lag and lead need a field, and take the row offset as their parameter.
        transform: [
          {
            type: 'window',
            sort: { field: 'i' },
            ops: ['lag', 'lead'],
            fields: ['v', 'v'],
            params: [{ signal: 'offset' }, { signal: 'offset' }],
            as: ['before', 'after'],
          },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 11], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickMinStep: 1, title: 'i' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'offset ' + offset + ': before = v from row i-' + offset + ', after = v from row i+' + offset" }, color: '#ddd' },
    marks: [
      {
        type: 'rule',
        from: { data: 'series' },
        encode: {
          update: {
            x: { scale: 'x', field: 'i' },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', field: 'before' },
            stroke: { value: 'tomato' },
            defined: { signal: 'isValid(datum.before)' },
          },
        },
      },
      {
        type: 'rule',
        from: { data: 'series' },
        encode: {
          update: {
            x: { scale: 'x', field: 'i', offset: 5 },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', field: 'after' },
            stroke: { value: 'seagreen' },
            defined: { signal: 'isValid(datum.after)' },
          },
        },
      },
      {
        type: 'line',
        from: { data: 'series' },
        encode: { update: { x: { scale: 'x', field: 'i' }, y: { scale: 'y', field: 'v' }, stroke: { value: '#9ab' }, strokeWidth: { value: 2 } } },
      },
      {
        type: 'symbol',
        from: { data: 'series' },
        encode: { update: { x: { scale: 'x', field: 'i' }, y: { scale: 'y', field: 'v' }, fill: { value: 'steelblue' }, size: { value: 50 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'offset', [1, 2, 3, 4, 5, 2], 1400);
  return () => stage.dispose();
};

export default mount;
