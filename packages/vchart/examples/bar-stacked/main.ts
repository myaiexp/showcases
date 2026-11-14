// Stacked bars: stack true, one segment per seriesField value, a hover outline
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { grouped, seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(8);
const next = () => grouped(rand, ['WY', 'DC', 'VT', 'ND', 'AK'], ['Under 5', '5 to 13', '14 to 17'], 5, 60);

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
      legends: { visible: !ctx.preview },
      // Outline the hovered segment (hover state of the bar mark).
      bar: { state: { hover: { stroke: '#fff', lineWidth: 2 } } },
    } as ISpec,
  });

export default mount;
