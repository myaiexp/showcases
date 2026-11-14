// A gradient line: stroke as a linear gradient with fading stops, points hidden
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { seeded } from '../../shared/cartesian-data.ts';
import { mountData } from '../../shared/cartesian-mount.ts';

const rand = seeded(27);
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const next = () => DAYS.map((x) => ({ x, y: Math.round(10 + rand() * 20) }));

const mount: Mount = (el, ctx) =>
  mountData(el, ctx, {
    next,
    spec: {
      type: 'line',
      data: [{ id: 'data', values: next() }],
      xField: 'x',
      yField: 'y',
      point: { visible: false },
      line: {
        style: {
          curveType: 'basis',
          lineWidth: 4,
          stroke: {
            gradient: 'linear',
            x0: 0,
            y0: 0.5,
            x1: 1,
            y1: 0.5,
            stops: [
              { offset: 0, color: '#009800', opacity: 0 },
              { offset: 0.5, color: '#1d983a', opacity: 0.6 },
              { offset: 1, color: '#4dca98', opacity: 1 },
            ],
          },
        },
      },
    } as ISpec,
  });

export default mount;
