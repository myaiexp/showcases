// Clearing states: all of an element's, all but one, or one state from every element
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, json } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: ['node1', 'node2', 'node3', 'node4'].map((id, i) => ({ id, style: { x: i * 110, y: i % 2 ? 40 : 0 } })),
          edges: [['node1', 'node2'], ['node2', 'node3'], ['node3', 'node4']].map(([s, t], i) => ({ id: `edge${i + 1}`, source: s!, target: t! })),
        },
        node: { style: { size: 34, labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2, endArrow: true } },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    const setup = (): Promise<void> =>
      graph.setElementState({ node1: ['selected', 'highlight', 'active'], node2: ['highlight'], node3: ['highlight', 'selected'], node4: ['highlight'] });
    await setup();

    callList(stage, graph, el, [
      { label: "setElementState('node1', []) clears everything on node1", run: () => graph.setElementState('node1', []) },
      {
        label: "setElementState('node3', ['selected']) keeps one state",
        run: () => graph.setElementState('node3', ['selected']),
      },
      {
        label: "filter 'highlight' out of every node's states",
        run: () => {
          const updates: Record<string, string[]> = {};
          for (const node of graph.getNodeData()) {
            updates[node.id] = graph.getElementState(node.id).filter((state) => state !== 'highlight');
          }
          graph.setElementState(updates);
          return { text: json(updates) };
        },
      },
      { label: 'Set the states again', run: setup },
    ], { mark: false });
  });

export default mount;
