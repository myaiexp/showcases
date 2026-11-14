// addChildrenData(parentId, nodes) grows a tree: it adds the nodes, the parent's children and the edges
import { Graph, treeToGraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const base = () => treeToGraphData({ id: 'root', children: [{ id: 'node1' }, { id: 'node2' }] });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: base(),
        node: { style: { size: 24, labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        layout: { type: 'compact-box', direction: 'TB', getHeight: () => 24, getWidth: () => 40, getVGap: () => 36, getHGap: () => 20 },
        autoFit: 'view',
        padding: 24,
        animation: false,
      }),
    );
    await graph.render();

    // The layout runs again so the new nodes get a place in the tree.
    callList(stage, graph, el, [
      { label: "addChildrenData('node1', [{ id: 'node1-1' }, { id: 'node1-2' }])", run: async () => { graph.addChildrenData('node1', [{ id: 'node1-1' }, { id: 'node1-2' }]); await graph.render(); } },
      { label: "addChildrenData('node2', [{ id: 'node2-1' }])", run: async () => { graph.addChildrenData('node2', [{ id: 'node2-1' }]); await graph.render(); } },
      { label: "addChildrenData('node1-1', [{ id: 'leaf' }])", run: async () => { graph.addChildrenData('node1-1', [{ id: 'leaf' }]); await graph.render(); } },
      { label: 'Reset', run: async () => { graph.setData(base()); await graph.render(); } },
    ]);
  });

export default mount;
