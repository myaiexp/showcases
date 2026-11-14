// FAQ: stack: false draws bars of one band on top of each other instead of stacking them
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = [
  ['WY', 25635, 1890, 9314],
  ['DC', 30352, 20439, 10225],
  ['VT', 38253, 42538, 15757],
  ['ND', 51896, 67358, 18794],
].flatMap(([State, a, b, c]) =>
  ['Under 5 Years', '5 to 13 Years', '14 to 17 Years'].map((Age, i) => ({ State, Age, Population: [a, b, c][i] })),
);

interface S {
  stack: boolean;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { stack: false },
    previewMs: 1800,
    step: (s) => ({ stack: !s.stack }),
    controls: (bar, live) => {
      select(bar, 'stack', ['false', 'true'], (v) => live.set({ stack: v === 'true' }));
    },
    build: (s): ISpec => ({
      type: 'bar',
      data: [{ id: 'pop', values }],
      xField: 'State',
      yField: 'Population',
      seriesField: 'Age',
      stack: s.stack,
      bar: { style: { fillOpacity: s.stack ? 1 : 0.7 }, state: { hover: { stroke: '#ffffff', lineWidth: 2 } } },
      legends: { visible: !ctx.preview, orient: 'top' },
    }),
  });

export default mount;
