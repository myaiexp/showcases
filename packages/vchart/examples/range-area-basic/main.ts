// Range area: yField as [min, max] fills the band between the two
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(71);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const next = () =>
  MONTHS.map((x, i) => {
    const mid = 12 + Math.sin((i / 12) * Math.PI * 2 - 1.6) * 12 + (rand() - 0.5) * 4;
    return { x, min: Math.round((mid - 4 - rand() * 4) * 10) / 10, max: Math.round((mid + 4 + rand() * 4) * 10) / 10 };
  });

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'rangeArea',
      data: [{ id: 'data', values: next() }],
      xField: 'x',
      yField: ['min', 'max'],
      area: { style: { fillOpacity: 0.55 } },
      crosshair: { xField: { visible: true } },
    } as ISpec,
  });

export default mount;
