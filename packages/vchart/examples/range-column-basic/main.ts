// Range column: yField is [min, max], each bar floats between the two values
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(3);
const NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const next = () =>
  NAMES.map((type) => {
    const min = Math.round(10 + rand() * 40);
    return { type, min, max: min + Math.round(15 + rand() * 60) };
  });

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'rangeColumn',
      data: [{ id: 'data', values: next() }],
      xField: 'type',
      yField: ['min', 'max'],
      label: { visible: true },
    } as ISpec,
  });

export default mount;
