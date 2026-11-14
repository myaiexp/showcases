// Histogram with uneven intervals: bar widths follow the from and to fields
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const EDGES = [0, 10, 16, 20, 30, 50, 80, 100];
const rand = seeded(19);
const next = () =>
  EDGES.slice(0, -1).map((from, i) => {
    const to = EDGES[i + 1] ?? from;
    return { from, to, profit: Math.round(2 + rand() * 12), type: to - from > 20 ? 'wide' : 'narrow' };
  });

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'histogram',
      data: [{ id: 'data', values: next() }],
      xField: 'from',
      x2Field: 'to',
      yField: 'profit',
      seriesField: 'type',
      bar: { style: { stroke: '#222', lineWidth: 1 } },
      legends: { visible: !ctx.preview, orient: 'top' },
    } as ISpec,
  });

export default mount;
