// Sunburst gap: the space between hierarchy levels
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, sunburstBase } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ gap: number }>(el, ctx, {
    initial: { gap: 0 },
    build: ({ gap }, preview) =>
      asSpec({
        ...sunburstBase(preview),
        gap,
        title: { visible: true, text: `gap: ${gap}`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'gap', [0, 24, 1], 0, (v) => live.set({ gap: v }));
    },
    step: (_s, i) => ({ gap: [0, 6, 14, 6][i % 4] as number }),
    previewMs: 1500,
  });

export default mount;
