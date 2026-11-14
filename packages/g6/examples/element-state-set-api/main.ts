// setElementState(): one element and one state, one element and several, or a batch object
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList } from '../../shared/graph-basics.ts';
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

    callList(stage, graph, el, [
      { label: "setElementState('node1', 'selected')", run: () => graph.setElementState('node1', 'selected') },
      { label: "setElementState('node2', ['highlight', 'active'])", run: () => graph.setElementState('node2', ['highlight', 'active']) },
      {
        label: 'setElementState({ node3: [...], edge1: [...], edge3: [...] })',
        run: () => graph.setElementState({ node3: ['selected'], node4: ['highlight'], edge1: ['active'], edge3: ['highlight'] }),
      },
      { label: "setElementState({ node1: [], node2: [], ... })", run: () => graph.setElementState({ node1: [], node2: [], node3: [], node4: [], edge1: [], edge3: [] }) },
    ], { mark: false });
  });

export default mount;
