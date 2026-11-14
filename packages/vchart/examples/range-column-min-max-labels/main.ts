// Range column: separate minLabel and maxLabel with their own formatMethod
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(9);
const next = () =>
  ['Oslo', 'Rome', 'Cairo', 'Lima', 'Perth'].map((city) => {
    const min = Math.round(-5 + rand() * 20);
    return { city, min, max: min + Math.round(6 + rand() * 14) };
  });

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'rangeColumn',
      data: [{ id: 'data', values: next() }],
      xField: 'city',
      yField: ['min', 'max'],
      label: {
        visible: true,
        // minLabel and maxLabel exist only with position bothEnd; their text defaults to the bar color, so give a fill.
        position: 'bothEnd',
        minLabel: { visible: true, style: { fill: '#ffffff' }, formatMethod: (text: string | string[]) => `low ${text}` },
        maxLabel: { visible: true, style: { fill: '#ffffff' }, formatMethod: (text: string | string[]) => `${text} °C` },
      },
    } as ISpec,
  });

export default mount;
