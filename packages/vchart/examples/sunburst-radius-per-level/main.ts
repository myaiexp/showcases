// Sunburst innerRadius / outerRadius arrays: one band per hierarchy level
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, salesTree, pathOf } from '../../shared/hierarchy-data.ts';

const PRESETS: Record<string, { inner: number[]; outer: number[] }> = {
  'even rings': { inner: [0, 0.33, 0.66], outer: [0.33, 0.66, 0.95] },
  'thin core': { inner: [0, 0.2, 0.7], outer: [0.2, 0.7, 0.95] },
  'donut': { inner: [0.3, 0.55, 0.8], outer: [0.55, 0.8, 0.95] },
  'spaced': { inner: [0, 0.4, 0.8], outer: [0.3, 0.7, 0.85] },
};
const NAMES = Object.keys(PRESETS);

const mount: Mount = (el, ctx) =>
  mountLive<{ preset: string }>(el, ctx, {
    initial: { preset: 'even rings' },
    build: ({ preset }, preview) => {
      const p = PRESETS[preset] as { inner: number[]; outer: number[] };
      return asSpec({
        type: 'sunburst',
        data: [{ id: 'data', values: salesTree() }],
        categoryField: 'name',
        valueField: 'value',
        sunburst: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.45 : 0.85) } },
        // Cards are too small for arc labels.
        label: { visible: !preview, style: { fontSize: 11 } },
        tooltip: { mark: { title: { value: pathOf } } },
        innerRadius: p.inner,
        outerRadius: p.outer,
        title: { visible: true, text: preset, textStyle: { fontSize: preview ? 11 : 15 } },
      });
    },
    controls: (bar, live) => {
      select(bar, 'radii', NAMES, (v) => live.set({ preset: v }));
    },
    step: (_s, i) => ({ preset: NAMES[i % NAMES.length] as string }),
    previewMs: 2000,
  });

export default mount;
