// Multi-series line: seriesField draws one line per group, the legend filters them
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded, trends } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(6);
const next = () => trends(rand, undefined, ['Berlin', 'Tokyo', 'Lima']);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'line',
      data: [{ id: 'data', values: next() }],
      xField: 'x',
      yField: 'value',
      seriesField: 'group',
      legends: { visible: !ctx.preview, orient: 'top' },
    } as ISpec,
  });

export default mount;
