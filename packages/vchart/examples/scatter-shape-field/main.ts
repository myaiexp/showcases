// Shapes per category: shapeField with an ordinal shape range
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { bubbles, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = bubbles(seeded(33), 30);
const SETS: Record<string, string[]> = {
  'star, triangleLeft, diamond': ['star', 'triangleLeft', 'diamond'],
  'circle, square, cross': ['circle', 'square', 'cross'],
  'wedge, triangleUp, rect': ['wedge', 'triangleUp', 'rect'],
};
const NAMES = Object.keys(SETS);

const mount: Mount = (el, ctx) =>
  mountLive<{ set: string }>(el, ctx, {
    initial: { set: NAMES[0] ?? '' },
    build: ({ set }) =>
      ({
        type: 'scatter',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'y',
        seriesField: 'kind',
        shapeField: 'kind',
        shape: { type: 'ordinal', range: SETS[set] },
        size: 14,
        legends: { visible: !ctx.preview, orient: 'top' },
        axes: [
          { orient: 'bottom', type: 'linear', min: 0, max: 100 },
          { orient: 'left', type: 'linear', min: 0, max: 100 },
        ],
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'shape.range', NAMES, (set) => live.set({ set }));
    },
    step: (_s, i) => ({ set: NAMES[i % NAMES.length] ?? '' }),
    previewMs: 1500,
  });

export default mount;
