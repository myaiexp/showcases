// Percent-stacked bars: stack and percent together, y axis labels formatted as percent
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { grouped, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(12);
const next = () => grouped(rand, ['WY', 'DC', 'VT', 'ND', 'AK'], ['Under 5', '5 to 13', '14 to 17'], 3, 70);

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'bar',
      data: [{ id: 'data', values: next() }],
      xField: 'cat',
      yField: 'value',
      seriesField: 'group',
      stack: true,
      percent: true,
      legends: { visible: !ctx.preview },
      axes: [{ orient: 'left', label: { formatMethod: (v: string | string[]) => `${Math.round(Number(v) * 100)}%` } }],
      tooltip: { mark: { visible: false } },
    } as ISpec,
  });

export default mount;
