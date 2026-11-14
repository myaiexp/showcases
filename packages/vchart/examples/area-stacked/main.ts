// Stacked area: stack true, one band per seriesField value
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded, trends } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(14);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const next = () => trends(rand, MONTHS, ['Lipstick', 'Cream', 'Perfume', 'Mask'], 5, 40);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'area',
      data: [{ id: 'data', values: next() }],
      xField: 'x',
      yField: 'value',
      seriesField: 'group',
      stack: true,
      legends: { visible: !ctx.preview, orient: 'bottom' },
    } as ISpec,
  });

export default mount;
