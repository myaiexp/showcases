// Circular progress maxValue: the value that fills the ring, instead of the default 1
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

interface State {
  max: number;
}

const MAXES = [1, 50, 100, 200];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { max: 100 },
    build: ({ max }, preview) => ({
      type: 'circularProgress',
      data: [{ id: 'steps', values: [{ type: 'Steps', value: 36 }] }],
      valueField: 'value',
      categoryField: 'type',
      maxValue: max,
      innerRadius: 0.55,
      outerRadius: 0.75,
      cornerRadius: 12,
      indicator: {
        visible: true,
        title: { visible: true, style: { text: `36 of ${max}`, fontSize: preview ? 14 : 22, fill: '#ddd' } },
      },
    }),
    controls: (bar, live) => {
      select(bar, 'maxValue', MAXES.map(String), (v) => live.set({ max: Number(v) })).value = String(live.state.max);
    },
    step: (_s, i) => ({ max: MAXES[i % MAXES.length] as number }),
    previewMs: 1500,
  });

export default mount;
