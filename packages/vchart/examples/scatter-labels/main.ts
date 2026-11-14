// Scatter labels: label.position and a formatMethod that prints the category
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { bubbles, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = bubbles(seeded(70), 9);
const POSITIONS = ['top', 'bottom', 'left', 'right', 'center'];

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string }>(el, ctx, {
    initial: { position: 'top' },
    build: ({ position }) =>
      ({
        type: 'scatter',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        seriesField: 'kind',
        size: 14,
        label: {
          visible: true,
          position,
          formatMethod: (_t: string | string[], datum?: Record<string, unknown>) => String(datum?.kind ?? ''),
        },
        legends: { visible: false },
        axes: [
          { orient: 'bottom', type: 'linear', min: 0, max: 100 },
          { orient: 'left', type: 'linear', min: 0, max: 100 },
        ],
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'label.position', POSITIONS, (position) => live.set({ position }));
    },
    step: (_s, i) => ({ position: POSITIONS[i % POSITIONS.length] ?? 'top' }),
    previewMs: 1400,
  });

export default mount;
