// Funnel funnelAlign and funnelOrient: which edge the layers line up on and which way the funnel points
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { funnelRows } from '../../shared/funnel-data.ts';

type Align = 'left' | 'center' | 'right';
type Orient = 'top' | 'bottom' | 'left' | 'right';
const ALIGNS: Align[] = ['center', 'left', 'right'];
const ORIENTS: Orient[] = ['top', 'bottom', 'left', 'right'];

interface State {
  align: Align;
  orient: Orient;
}

const STEPS: State[] = [
  { align: 'center', orient: 'top' },
  { align: 'left', orient: 'top' },
  { align: 'center', orient: 'right' },
  { align: 'center', orient: 'bottom' },
  { align: 'right', orient: 'left' },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ align, orient }, preview) => ({
      type: 'funnel',
      data: [{ id: 'stages', values: funnelRows() }],
      categoryField: 'name',
      valueField: 'value',
      funnelAlign: align,
      funnelOrient: orient,
      legends: { visible: false },
      label: { visible: true, style: { fontSize: preview ? 9 : 12 } },
    }),
    controls: (bar, live) => {
      select(bar, 'funnelAlign', ALIGNS, (v) => live.set({ align: v as Align }));
      select(bar, 'funnelOrient', ORIENTS, (v) => live.set({ orient: v as Orient }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1700,
  });

export default mount;
