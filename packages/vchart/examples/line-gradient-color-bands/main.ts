// Color bands on a line: gradient stops at equal offsets give hard color edges
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((x, i) => ({
  x,
  y: [82, 50, 64, 95, 20, 70, 38, 88, 55][i],
}));

const mount: Mount = (el, ctx) =>
  mountLive<{ high: number }>(el, ctx, {
    initial: { high: 0.3 },
    build: ({ high }) =>
      ({
        type: 'line',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        axes: [{ orient: 'left', min: 0, max: 100 }],
        line: {
          style: {
            lineWidth: 4,
            stroke: {
              gradient: 'linear',
              x0: 0,
              y0: 0,
              x1: 0,
              y1: 1,
              // Top of the line to its bottom: red, amber, green, with hard edges.
              stops: [
                { offset: 0, color: '#e5534b' },
                { offset: high, color: '#e5534b' },
                { offset: high, color: '#d9a441' },
                { offset: 0.7, color: '#d9a441' },
                { offset: 0.7, color: '#3fb27f' },
                { offset: 1, color: '#3fb27f' },
              ],
            },
          },
        },
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'red band to', [0.1, 0.65, 0.05], 0.3, (high) => live.set({ high }));
    },
    step: (_s, i) => ({ high: [0.15, 0.3, 0.5, 0.6][i % 4] ?? 0.3 }),
    previewMs: 1300,
  });

export default mount;
