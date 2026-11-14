// A label for the line itself: lineLabel at the start or the end, showing the series name
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { seeded, trends } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = trends(seeded(18), ['2019', '2020', '2021', '2022', '2023'], ['Solar', 'Wind', 'Hydro']);

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string }>(el, ctx, {
    initial: { position: 'end' },
    build: ({ position }) =>
      ({
        type: 'line',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'value',
        seriesField: 'group',
        point: { visible: false },
        padding: { right: 70, left: 20 },
        lineLabel: {
          visible: true,
          position,
          formatMethod: (_text: string | string[], datum?: Record<string, unknown>) => String(datum?.group ?? ''),
        },
        legends: { visible: false },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'lineLabel.position', ['end', 'start'], (position) => live.set({ position }));
    },
    step: (s) => ({ position: s.position === 'end' ? 'start' : 'end' }),
    previewMs: 1800,
  });

export default mount;
