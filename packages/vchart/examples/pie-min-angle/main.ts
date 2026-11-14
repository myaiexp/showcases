// Pie minAngle: a floor on a sector's angle so tiny values stay big enough to hover
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DATA = [
  { type: 'Desktop', value: 620 },
  { type: 'Mobile', value: 340 },
  { type: 'Tablet', value: 28 },
  { type: 'Console', value: 9 },
  { type: 'TV', value: 4 },
  { type: 'Watch', value: 1 },
];

interface State {
  min: number;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { min: 10 },
    build: ({ min }, preview) => ({
      type: 'pie',
      data: [{ id: 'devices', values: DATA }],
      categoryField: 'type',
      valueField: 'value',
      outerRadius: 0.8,
      innerRadius: 0.4,
      minAngle: min,
      padAngle: 1,
      legends: { visible: !preview, orient: 'left' },
      label: { visible: true, position: 'outside', style: { fontSize: preview ? 10 : 12 } },
    }),
    controls: (bar, live) => {
      slider(bar, 'minAngle', [0, 40, 1], live.state.min, (min) => live.set({ min }));
    },
    step: (_s, i) => ({ min: [0, 8, 16, 28][i % 4] as number }),
    previewMs: 1600,
  });

export default mount;
