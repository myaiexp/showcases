// Bar styling: a linear gradient fill and cornerRadius on the bar mark
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((x, i) => ({ x, y: [100, 66, 95, 52, 68, 80, 48][i] }));

const mount: Mount = (el, ctx) =>
  mountLive<{ radius: number }>(el, ctx, {
    initial: { radius: 10 },
    build: ({ radius }) =>
      ({
        type: 'bar',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        bar: {
          style: {
            cornerRadius: radius,
            fill: {
              gradient: 'linear',
              x0: 0.5,
              y0: 0,
              x1: 0.5,
              y1: 1,
              stops: [
                { offset: 0, color: '#86DF6C' },
                { offset: 1, color: '#468DFF' },
              ],
            },
          },
        },
        axes: [
          { orient: 'bottom', domainLine: { visible: false }, paddingInner: 0.2 },
          { orient: 'left', grid: { visible: false }, domainLine: { visible: false } },
        ],
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'cornerRadius', [0, 24, 1], 10, (radius) => live.set({ radius }));
    },
    step: (_s, i) => ({ radius: [0, 6, 14, 24, 10][i % 5] ?? 0 }),
    previewMs: 1300,
  });

export default mount;
