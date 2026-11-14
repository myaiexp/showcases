// Treemap minVisibleArea / minChildrenVisibleArea: prune tiles that are too small to read
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, moduleTree, pathOf } from '../../shared/hierarchy-data.ts';

type S = { node: number; children: number };
const STEPS: S[] = [
  { node: 10, children: 0 },
  { node: 400, children: 0 },
  { node: 1200, children: 0 },
  { node: 10, children: 6000 },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { node: 10, children: 0 },
    build: ({ node, children }, preview) =>
      asSpec({
        type: 'treemap',
        data: [{ id: 'data', values: moduleTree() }],
        categoryField: 'name',
        valueField: 'value',
        label: { visible: true, style: { fontSize: preview ? 9 : 11 } },
        tooltip: { mark: { title: { value: pathOf } } },
        minVisibleArea: node,
        // 0 disables the child pruning: a parent is never that small.
        minChildrenVisibleArea: children || undefined,
        nodePadding: [3],
        nonLeaf: { visible: true, style: { fillOpacity: 0.2 } },
        title: { visible: true, text: `minVisibleArea ${node}, minChildrenVisibleArea ${children || 'unset'}`, textStyle: { fontSize: preview ? 10 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'minVisibleArea', [0, 3000, 50], 10, (v) => live.set({ node: v }));
      slider(bar, 'minChildrenVisibleArea', [0, 20000, 500], 0, (v) => live.set({ children: v }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 1800,
  });

export default mount;
