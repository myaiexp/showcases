// Window frames: a sliding aggregate over rows before and after the current one
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const aggregates = ['sum', 'count', 'average', 'median', 'stdev', 'min', 'max'];
const frames: [number | null, number | null][] = [
  [null, 0], [-2, 2], [-5, 0], [0, 5], [-1, 1], [null, null],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 180,
    padding: 5,
    signals: [
      { name: 'aggregate', value: 'average', bind: { input: 'select', options: aggregates } },
      { name: 'frameStart', value: -2, bind: { input: 'select', options: [null, -5, -2, -1, 0] } },
      { name: 'frameEnd', value: 2, bind: { input: 'select', options: [0, 1, 2, 5, null] } },
    ],
    data: [
      {
        name: 'table',
        values: [28, 55, 43, 91, 81, 53, 19, 87, 52, 48, 24, 49, 87, 66, 17, 27, 68, 16, 49, 15].map((v, i) => ({ u: i + 1, v })),
        // frame is [rows before, rows after]; null means unbounded in that direction.
        transform: [
          {
            type: 'window',
            sort: { field: 'u' },
            frame: [{ signal: 'frameStart' }, { signal: 'frameEnd' }],
            ops: [{ signal: 'aggregate' }],
            fields: ['v'],
            as: ['value'],
          },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [1, 20], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'table', field: 'value' }, nice: true, zero: true, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 20 }, { orient: 'left', scale: 'y', tickCount: 5 }],
    title: {
      text: { signal: "aggregate + '(v) over frame [' + (frameStart == null ? '-inf' : frameStart) + ', ' + (frameEnd == null ? '+inf' : frameEnd) + ']'" },
      color: '#ddd',
    },
    marks: [
      {
        type: 'line',
        from: { data: 'table' },
        encode: {
          update: { x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'value' }, stroke: { value: 'steelblue' }, strokeWidth: { value: 3 } },
        },
      },
      {
        type: 'symbol',
        from: { data: 'table' },
        encode: { update: { x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'value' }, fill: { value: 'steelblue' }, size: { value: 30 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    stage.every(1500, async (i) => {
      const [a, b] = frames[i % frames.length]!;
      view.signal('aggregate', aggregates[Math.floor(i / 2) % aggregates.length]).signal('frameStart', a).signal('frameEnd', b);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
