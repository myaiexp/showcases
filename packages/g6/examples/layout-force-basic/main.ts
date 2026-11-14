// The docs' force-directed example, with node size feeding preventOverlap
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const data = () => ({
  nodes: [30, 20, 20, 20, 30, 20].map((size, i) => ({ id: `node${i + 1}`, style: { size } })),
  edges: [[1, 2], [1, 3], [2, 4], [3, 4], [4, 5], [5, 6]].map(([s, t], i) => ({ id: `e${i}`, source: `node${s}`, target: `node${t}` })),
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force', preventOverlap: true, nodeSize: (d: NodeData) => Number(d.style?.size ?? 20), gravity: 0.9, iterations: 100 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: data(),
        node: {
          style: { size: (d) => Number(d.style?.size ?? 20), fill: '#9EC9FF', stroke: '#69C8FF', labelText: (d) => d.id.replace('node', 'Node '), labelPlacement: 'center', labelFill: '#333', labelFontSize: 8 },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // The docs grow a node on click and re-render; here a toggle (or the card timer) does the same.
    const grow = async (big: boolean): Promise<void> => {
      graph.updateNodeData([{ id: 'node1', style: { size: big ? 70 : 30 } }]);
      await graph.draw();
      await relayout(graph, layout, {});
    };
    if (stage.bar) toggle(stage.bar, 'node 1 size 70', false, grow);
    else stage.every(2600, (i) => grow(i % 2 === 1));
  });

export default mount;
