// Treemap gapWidth: one number for all levels, or an array with a gap per level
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, treemapBase } from '../../shared/hierarchy-data.ts';

type Gaps = { g0: number; g1: number; g2: number };
const STEPS: Gaps[] = [
  { g0: 1, g1: 1, g2: 1 },
  { g0: 14, g1: 1, g2: 1 },
  { g0: 14, g1: 7, g2: 1 },
  { g0: 14, g1: 7, g2: 4 },
];

const mount: Mount = (el, ctx) =>
  mountLive<Gaps>(el, ctx, {
    initial: { g0: 14, g1: 6, g2: 1 },
    build: ({ g0, g1, g2 }, preview) =>
      asSpec({
        ...treemapBase(preview),
        gapWidth: preview ? [g0 / 2, g1 / 2, g2 / 2] : [g0, g1, g2],
        title: { visible: true, text: `gapWidth: [${g0}, ${g1}, ${g2}]`, textStyle: { fontSize: preview ? 12 : 16 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'level 0', [0, 24, 1], 14, (v) => live.set({ g0: v }));
      slider(bar, 'level 1', [0, 24, 1], 6, (v) => live.set({ g1: v }));
      slider(bar, 'level 2', [0, 24, 1], 1, (v) => live.set({ g2: v }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as Gaps,
    previewMs: 1800,
  });

export default mount;
