// Waterfall total: type custom, product(datum, current) returns the start and end of a total bar
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(31);
const next = () => [
  { x: 'Sub-total', total: true },
  ...['0', '1', '2', '3', '4'].map((x) => ({ x, y: Math.round(10 + rand() * 20), type: 'A' })),
  ...['0', '1', '2', '3', '4'].map((x) => ({ x, y: Math.round(10 + rand() * 20), type: 'B' })),
  { x: 'Total', total: true },
];

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'waterfall',
      data: { id: 'data', values: next() },
      xField: 'x',
      yField: 'y',
      seriesField: 'type',
      total: {
        type: 'custom',
        tagField: 'total',
        product: (datum: Record<string, unknown>, current: { start: number; end: number }) =>
          datum.x === 'Sub-total' ? { start: 0, end: 100 } : { start: 0, end: current.end },
      },
      stackLabel: { style: { fill: '#dddddd' } },
      legends: { visible: !ctx.preview, orient: 'bottom' },
      axes: [
        { orient: 'left', range: { min: 0 } },
        { orient: 'bottom', type: 'band', paddingInner: 0.4 },
      ],
    } as ISpec,
  });

export default mount;
