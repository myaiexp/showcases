// Percent-stacked area: stack and percent, axis labels as percentages
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded, trends } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(23);
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
      percent: true,
      legends: { visible: !ctx.preview, orient: 'bottom' },
      axes: [{ orient: 'left', label: { formatMethod: (v: string | string[]) => `${Math.round(Number(v) * 100)}%` } }],
    } as ISpec,
  });

export default mount;
