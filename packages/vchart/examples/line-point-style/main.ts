// Marker points: point.style shape and size, a hover state
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { HOURS } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = HOURS.slice(0, 9).map((time, i) => ({ time, value: [8, 12, 9, 21, 15, 26, 19, 30, 24][i] }));
const SHAPES = ['circle', 'triangle', 'diamond', 'square', 'star', 'cross', 'wedge'];

const mount: Mount = (el, ctx) =>
  mountLive<{ shape: string; size: number }>(el, ctx, {
    initial: { shape: 'triangle', size: 12 },
    build: ({ shape, size }) =>
      ({
        type: 'line',
        data: [{ id: 'data', values }],
        xField: 'time',
        yField: 'value',
        point: { style: { shape, size }, state: { hover: { scaleX: 1.6, scaleY: 1.6 } } },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'shape', SHAPES, (shape) => live.set({ shape })).value = 'triangle';
      slider(bar, 'size', [4, 30, 1], 12, (size) => live.set({ size }));
    },
    step: (_s, i) => ({ shape: SHAPES[i % SHAPES.length] ?? 'circle', size: 8 + (i % 3) * 6 }),
    previewMs: 1300,
  });

export default mount;
