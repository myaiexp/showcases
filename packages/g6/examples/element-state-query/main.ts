// getElementState(), getElementDataByState() and a plain includes() check on the states
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

    await graph.setElementState({ node1: ['selected', 'highlight'], node2: ['highlight'], node4: ['selected'], edge2: ['highlight'] });

    // The queries do not change the graph, so the nodes a query names are drawn larger.
    const ask = (found: string[], text: string): { text: string } => {
      graph.updateNodeData(graph.getNodeData().map((n) => ({ id: n.id, style: { size: found.includes(String(n.id)) ? 52 : 34 } })));
      return { text };
    };
    callList(
      stage,
      graph,
      el,
      [
        { label: "getElementState('node1')", run: () => ask(['node1'], json(graph.getElementState('node1'))) },
        { label: "getElementState('node3')", run: () => ask(['node3'], json(graph.getElementState('node3'))) },
        {
          label: "getElementDataByState('node', 'selected')",
          run: () => {
            const found = graph.getElementDataByState('node', 'selected');
            return ask(found.map((n) => String(n.id)), json(found.map((n) => n.id)));
          },
        },
        {
          label: "getElementDataByState('edge', 'highlight')",
          run: () => {
            const found = graph.getElementDataByState('edge', 'highlight');
            return ask([], json(found.map((e) => e.id)));
          },
        },
        {
          label: "getElementState('node1').includes('highlight')",
          run: () => ask(['node1'], String(graph.getElementState('node1').includes('highlight'))),
        },
      ],
      { mark: false },
    );
  });

export default mount;
