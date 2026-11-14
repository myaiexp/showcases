// Point labels on a line: label.position
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((x, i) => ({ x, y: [14, 28, 19, 33, 24, 38][i] }));
const POSITIONS = ['top', 'bottom', 'left', 'right', 'top-right', 'bottom-left', 'center'];

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string }>(el, ctx, {
    initial: { position: 'top' },
    build: ({ position }) =>
      ({
        type: 'line',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        label: { visible: true, position },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'label.position', POSITIONS, (position) => live.set({ position }));
    },
    step: (_s, i) => ({ position: POSITIONS[i % POSITIONS.length] ?? 'top' }),
    previewMs: 1300,
  });

export default mount;
