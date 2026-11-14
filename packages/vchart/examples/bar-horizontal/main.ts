// Horizontal bars: direction horizontal, the value on xField and the category on yField
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded, type Datum } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const BRANDS = ['Apple', 'Google', 'Amazon', 'Microsoft', 'Coca-Cola', 'Samsung', 'Toyota', 'Mercedes', 'Intel', 'Nike'];
const rand = seeded(2);
// A 200px card fits about six readable bars.
const ranking = (count: number) => (): Datum[] =>
  BRANDS.slice(0, count)
    .map((name) => ({ name, value: Math.round(20 + rand() * 180) }))
    .sort((a, b) => Number(a.value) - Number(b.value));

const mount: Mount = (el, ctx) => {
  const next = ranking(ctx.preview ? 6 : BRANDS.length);
  return mountData(el, ctx, {
    next,
    spec: {
      type: 'bar',
      data: [{ id: 'data', values: next() }],
      direction: 'horizontal',
      xField: 'value',
      yField: 'name',
      // The first category sits at the bottom, so ascending data puts the largest on top.
      axes: [{ orient: 'bottom', visible: false }],
      label: { visible: true },
    } as ISpec,
  });
};

export default mount;
