// Treemap nodePadding: the margin between a parent rectangle and its children
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, treemapBase } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ padding: number }>(el, ctx, {
    initial: { padding: 5 },
    build: ({ padding }, preview) =>
      asSpec({
        ...treemapBase(preview),
        nodePadding: [padding],
        // Non-leaf rectangles are hidden by default; showing them makes the padding visible.
        nonLeaf: { visible: true, style: { fillOpacity: 0.25 } },
        title: { visible: true, text: `nodePadding: [${padding}]`, textStyle: { fontSize: preview ? 12 : 16 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'nodePadding', [0, 24, 1], 5, (v) => live.set({ padding: v }));
    },
    step: (_s, i) => ({ padding: [0, 6, 12, 20][i % 4] as number }),
    previewMs: 1800,
  });

export default mount;
