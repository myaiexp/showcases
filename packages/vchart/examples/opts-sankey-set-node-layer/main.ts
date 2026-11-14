// sankey setNodeLayer: assign nodes to columns by hand
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const LINKS = [
  ['Sales', 'Revenue', 40], ['Services', 'Revenue', 25], ['Revenue', 'Costs', 30], ['Revenue', 'Profit', 35],
  ['Costs', 'Staff', 18], ['Costs', 'Hosting', 12], ['Profit', 'Tax', 8], ['Profit', 'Reinvest', 27],
].map(([source, target, value]) => ({ source, target, value }));

// Every node gets a column: Costs is pushed one column further right than its depth.
const LAYERS: Record<string, number> = { Sales: 0, Services: 0, Revenue: 1, Profit: 2, Costs: 3, Tax: 3, Reinvest: 3, Staff: 4, Hosting: 4 };

// Flat sankey data: one row holding the node list and the link list.
const NODES = [...new Set(LINKS.flatMap((l) => [l.source, l.target]))].map((nodeName) => ({ nodeName }));

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'custom' },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s) => ({ mode: s.mode === 'custom' ? 'computed' : 'custom' }),
    build: (s, preview) =>
      ({
        type: 'sankey',
        data: [{ id: 'd', values: [{ nodes: NODES, links: LINKS }] }],
        categoryField: 'nodeName',
        valueField: 'value',
        sourceField: 'source',
        targetField: 'target',
        nodeKey: 'nodeName',
        nodeAlign: 'left',
        nodeGap: preview ? 6 : 14,
        nodeWidth: 14,
        ...(s.mode === 'custom' ? { setNodeLayer: (node: { nodeName?: string; key?: string }) => LAYERS[node.nodeName ?? node.key ?? ''] ?? 0 } : {}),
        link: { style: { fillOpacity: 0.45 } },
        label: { visible: true, style: { fontSize: preview ? 9 : 12 } },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'column assignment', ['custom', 'computed'], (v) => live.set({ mode: v }));
    },
  });

export default mount;
