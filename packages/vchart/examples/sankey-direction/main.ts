// Sankey direction / inverse: four ways the flow can run
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, sankeyBase } from '../../shared/flow-data.ts';

const MODES: Record<string, { direction: string; inverse: boolean }> = {
  'horizontal': { direction: 'horizontal', inverse: false },
  'horizontal, inverse': { direction: 'horizontal', inverse: true },
  'vertical': { direction: 'vertical', inverse: false },
  'vertical, inverse': { direction: 'vertical', inverse: true },
};
const NAMES = Object.keys(MODES);

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'horizontal' },
    mode: 'rebuild',
    build: ({ mode }, preview) =>
      asSpec({
        ...sankeyBase(preview),
        ...MODES[mode],
        title: { visible: true, text: mode, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      select(bar, 'direction', NAMES, (v) => live.set({ mode: v }));
    },
    // Vertical layouts are squashed in a 200px card, so the card alternates the two horizontal ones.
    step: (_s, i) => ({ mode: NAMES[i % 2] as string }),
    previewMs: 2000,
  });

export default mount;
