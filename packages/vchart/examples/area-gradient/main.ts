// A gradient area: area.style.fill as a vertical gradient that fades out
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { slider } from '../../shared/chart.ts';
import { HOURS } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = HOURS.map((time, i) => ({ time, value: [12, 30, 18, 42, 28, 55, 36, 60, 44, 26, 34][i] }));

const mount: Mount = (el, ctx) =>
  mountLive<{ end: number }>(el, ctx, {
    initial: { end: 1 },
    build: ({ end }) =>
      ({
        type: 'area',
        data: [{ id: 'data', values }],
        xField: 'time',
        yField: 'value',
        point: { visible: false },
        line: { style: { curveType: 'monotone', stroke: '#6aa9ff', lineWidth: 2 } },
        area: {
          style: {
            fill: {
              gradient: 'linear',
              x0: 0.5,
              y0: 0,
              x1: 0.5,
              y1: 1,
              stops: [
                { offset: 0, color: '#6aa9ff', opacity: 0.85 },
                { offset: end, color: '#6aa9ff', opacity: 0 },
              ],
            },
          },
        },
      }) as ISpec,
    controls: (bar, live) => {
      slider(bar, 'fade-out offset', [0.2, 1, 0.1], 1, (end) => live.set({ end }));
    },
    step: (_s, i) => ({ end: [1, 0.6, 0.3, 0.8][i % 4] ?? 1 }),
    previewMs: 1300,
  });

export default mount;
