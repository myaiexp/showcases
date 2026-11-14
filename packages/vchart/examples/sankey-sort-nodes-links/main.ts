// Sankey nodeSortBy / linkSortBy: ordering nodes in a column and links at a node
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, budgetFlat } from '../../shared/flow-data.ts';

// The layout hands nodeSortBy node objects ({ key, value }) and linkSortBy link objects ({ source, target, value }).
interface N { key: string; value: number }
interface L { source: string; target: string; value: number }
interface Sort { node: (a: N, b: N) => number; link: (a: L, b: L) => number }

const SORTS: Record<string, Sort | undefined> = {
  'layout default': undefined,
  'value, largest first': { node: (a, b) => b.value - a.value, link: (a, b) => b.value - a.value },
  'value, smallest first': { node: (a, b) => a.value - b.value, link: (a, b) => a.value - b.value },
  'name, A to Z': { node: (a, b) => a.key.localeCompare(b.key), link: (a, b) => a.target.localeCompare(b.target) },
};
const NAMES = Object.keys(SORTS);

const mount: Mount = (el, ctx) =>
  mountLive<{ sort: string }>(el, ctx, {
    initial: { sort: 'layout default' },
    mode: 'rebuild',
    build: ({ sort }, preview) => {
      const s = SORTS[sort];
      return asSpec({
        type: 'sankey',
        data: [{ id: 'data', values: budgetFlat() }],
        categoryField: 'nodeName',
        valueField: 'value',
        sourceField: 'source',
        targetField: 'target',
        nodeKey: 'nodeName',
        nodeAlign: 'justify',
        nodeGap: preview ? 6 : 10,
        nodeWidth: 12,
        minNodeHeight: 4,
        link: { style: { fillOpacity: 0.5 } },
        label: { visible: true, style: { fontSize: preview ? 8 : 11 } },
        ...(s ? { nodeSortBy: s.node, linkSortBy: s.link } : {}),
        // A single layout pass keeps the sorted order instead of relaxing it away.
        iterations: 1,
        title: { visible: true, text: sort, textStyle: { fontSize: preview ? 11 : 15 } },
      });
    },
    controls: (bar, live) => {
      select(bar, 'sort', NAMES, (v) => live.set({ sort: v }));
    },
    step: (_s, i) => ({ sort: NAMES[i % NAMES.length] as string }),
    previewMs: 2000,
  });

export default mount;
