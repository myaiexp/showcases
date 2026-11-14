// Range column labels: middle, start, end or bothEnd
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = [
  [76, 100],
  [56, 108],
  [38, 129],
  [58, 155],
  [45, 120],
  [23, 99],
].map(([min, max], i) => ({ type: `Group ${i + 1}`, min, max }));
const POSITIONS = ['middle', 'start', 'end', 'bothEnd'];

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string }>(el, ctx, {
    initial: { position: 'bothEnd' },
    build: ({ position }) =>
      ({
        type: 'rangeColumn',
        data: [{ id: 'data', values }],
        direction: 'horizontal',
        yField: 'type',
        xField: ['min', 'max'],
        label: { visible: true, position },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'label.position', POSITIONS, (position) => live.set({ position })).value = 'bothEnd';
    },
    step: (_s, i) => ({ position: POSITIONS[i % POSITIONS.length] ?? 'middle' }),
    previewMs: 1500,
  });

export default mount;
