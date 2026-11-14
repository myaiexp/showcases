// Sunburst gap: the space between hierarchy levels
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, salesTree, pathOf } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ gap: number }>(el, ctx, {
    initial: { gap: 0 },
    build: ({ gap }, preview) =>
      asSpec({
        type: 'sunburst',
        data: [{ id: 'data', values: salesTree() }],
        categoryField: 'name',
        valueField: 'value',
        outerRadius: 0.95,
        sunburst: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.45 : 0.85) } },
        // Cards are too small for arc labels.
        label: { visible: !preview, style: { fontSize: 11 } },
        tooltip: { mark: { title: { value: pathOf } } },
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
