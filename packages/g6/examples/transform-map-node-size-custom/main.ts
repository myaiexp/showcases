// map-node-size transform: centrality as a function returning a Map of node id to value
import { Graph, type GraphData, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// Each node carries a "revenue" field that the built-in centralities know nothing about.
const nodes: NodeData[] = [
  ['A', 120], ['B', 40], ['C', 75], ['D', 10], ['E', 95], ['F', 30], ['G', 60], ['H', 5],
].map(([id, revenue]) => ({ id: String(id), data: { revenue, cost: 130 - Number(revenue) } }));

const FIELDS = ['revenue', 'cost'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const byField =
      (field: (typeof FIELDS)[number]) =>
      (data: GraphData): Map<string, number> =>
        new Map((data.nodes ?? []).map((n) => [String(n.id), Number(n.data?.[field] ?? 0)]));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes, edges: [] },
        node: { style: { fill: '#E86452', labelText: (d: NodeData) => `${d.id}${stage.preview ? '' : ` (${d.data?.revenue})`}`, labelPlacement: 'bottom' } },
        layout: { type: 'grid', cols: 4 },
        transforms: [{ key: 'map-node-size', type: 'map-node-size', centrality: byField('revenue'), scale: 'linear', minSize: 16, maxSize: 60 }],
      }),
    );
    await graph.render();

    const setField = async (field: (typeof FIELDS)[number]): Promise<void> => {
      graph.updateTransform({ key: 'map-node-size', centrality: byField(field) });
      await graph.render();
    };
    if (stage.bar) select(stage.bar, 'centrality reads data field', FIELDS, 'revenue', (v) => void setField(v));
    else stage.every(1600, (i) => setField(FIELDS[i % 2]!));
  });

export default mount;
