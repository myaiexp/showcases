// Treemap maxDepth: show only the first N levels of the hierarchy
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, moduleTree, pathOf } from '../../shared/hierarchy-data.ts';

const DEPTHS = ['1', '2', '3'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ depth: number }>(el, ctx, {
    initial: { depth: 3 },
    build: ({ depth }, preview) =>
      asSpec({
        type: 'treemap',
        data: [{ id: 'data', values: moduleTree() }],
        categoryField: 'name',
        valueField: 'value',
        label: { visible: true, style: { fontSize: preview ? 9 : 11 } },
        tooltip: { mark: { title: { value: pathOf } } },
        maxDepth: depth,
        nodePadding: [4],
        nonLeaf: { visible: true, style: { fillOpacity: 0.2 } },
        title: { visible: true, text: `maxDepth: ${depth}`, textStyle: { fontSize: preview ? 12 : 16 } },
      }),
    controls: (bar, live) => {
      const sel = select(bar, 'maxDepth', DEPTHS, (v) => live.set({ depth: Number(v) }));
      sel.value = '3';
    },
    step: (_s, i) => ({ depth: (i % 3) + 1 }),
    previewMs: 1800,
  });

export default mount;
