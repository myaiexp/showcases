// Pie label layout: align, strategy and tangentConstraint decide how crowded labels are resolved
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { rng } from '../../shared/polar-data.ts';

// Twenty-two sectors, a dozen of them thin, so the labels compete for room.
const r = rng(21);
const CROWDED = Array.from({ length: 22 }, (_, i) => ({
  type: `Item ${String(i + 1).padStart(2, '0')}`,
  value: i % 2 ? 1 + Math.round(r() * 3) : 6 + Math.round(r() * 14),
}));

type Align = 'arc' | 'labelLine' | 'edge';
type Strategy = 'priority' | 'vertical' | 'none';
interface State {
  align: Align;
  strategy: Strategy;
  tangent: boolean;
  cover: boolean;
}

const ALIGN: Align[] = ['arc', 'labelLine', 'edge'];
const STRATEGY: Strategy[] = ['priority', 'vertical', 'none'];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { align: 'arc', strategy: 'priority', tangent: true, cover: false },
    build: ({ align, strategy, tangent, cover }, preview) => ({
      type: 'pie',
      data: [{ id: 'crowded', values: CROWDED }],
      categoryField: 'type',
      valueField: 'value',
      outerRadius: preview ? 0.55 : 0.65,
      legends: { visible: false },
      label: {
        visible: true,
        position: 'outside',
        coverEnable: cover,
        style: { fontSize: preview ? 9 : 12 },
        layout: { align, strategy, tangentConstraint: tangent },
      },
    }),
    controls: (bar, live) => {
      select(bar, 'layout.align', ALIGN, (v) => live.set({ align: v as Align }));
      select(bar, 'layout.strategy', STRATEGY, (v) => live.set({ strategy: v as Strategy }));
      select(bar, 'tangentConstraint', ['true', 'false'], (v) => live.set({ tangent: v === 'true' }));
      select(bar, 'coverEnable', ['false', 'true'], (v) => live.set({ cover: v === 'true' }));
    },
    step: (_s, i) => ({ align: ALIGN[i % 3] as Align, strategy: STRATEGY[Math.floor(i / 3) % 3] as Strategy }),
    previewMs: 1600,
  });

export default mount;
