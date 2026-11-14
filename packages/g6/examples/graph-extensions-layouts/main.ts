// The built-in layout types from the extensions list, applied to the same tree-shaped graph
import { Graph, treeToGraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const LAYOUTS = [
  'antv-dagre', 'circular', 'combo-combined', 'compact-box', 'concentric', 'd3-force', 'dagre', 'dendrogram',
  'force', 'force-atlas2', 'fruchterman', 'grid', 'indented', 'mds', 'mindmap', 'radial', 'random',
] as const;

// A tree is also a graph, so one dataset suits every layout, tree layouts included.
const leaves = (p: string, n: number) => Array.from({ length: n }, (_, i) => ({ id: `${p}-${i + 1}` }));
const tree = {
  id: 'root',
  children: [
    { id: 'A', children: leaves('A', 3) },
    { id: 'B', children: [{ id: 'B-1', children: leaves('B-1', 2) }, { id: 'B-2' }] },
    { id: 'C', children: leaves('C', 2) },
  ],
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: treeToGraphData(tree),
        node: { style: { size: 14, labelText: (d) => d.id, labelFontSize: 9 } },
        edge: { style: { stroke: '#4a5a7a' } },
        autoFit: 'view',
        animation: { duration: 500 },
        layout: { type: 'dagre' },
      }),
    );
    await graph.render();

    const apply = async (type: (typeof LAYOUTS)[number]): Promise<void> => {
      graph.setOptions({ layout: { type } });
      await graph.layout();
      await graph.fitView({}, { duration: 400 });
    };

    if (stage.bar) select(stage.bar, 'layout.type', LAYOUTS, 'dagre', (v) => void apply(v));
    else {
      const card = ['dagre', 'radial', 'circular', 'grid', 'mindmap', 'concentric'] as const;
      stage.every(2000, (i) => apply(card[i % card.length]!));
    }
  });

export default mount;
