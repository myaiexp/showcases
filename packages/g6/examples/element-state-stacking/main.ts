// States stack: when two set the same property, the later state in the array wins
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
        data: { nodes: [{ id: 'node1', style: { x: 0, y: 0 } }, { id: 'node2', style: { x: 140, y: 0 } }] },
        node: {
          style: { size: 56, fill: '#C6E5FF', stroke: '#5B8FF9', lineWidth: 2, labelText: (d) => d.id, labelPlacement: 'bottom' },
          // Both states set the stroke and fill; selected also sets a shadow, highlight does not.
          state: {
            selected: { fill: '#95D6FB', stroke: '#1890FF', lineWidth: 4, shadowColor: '#1890FF', shadowBlur: 14 },
            highlight: { stroke: '#FF6A00', lineWidth: 6 },
          },
        },
        autoFit: 'view',
        padding: 36,
      }),
    );
    await graph.render();

    // Same two states, opposite order: node1 ends up orange-bordered, node2 blue-bordered.
    callList(stage, graph, el, [
      { label: "node1 ['selected', 'highlight'], node2 ['highlight', 'selected']", run: () => graph.setElementState({ node1: ['selected', 'highlight'], node2: ['highlight', 'selected'] }) },
      { label: "node1 'selected' only, node2 'highlight' only", run: () => graph.setElementState({ node1: ['selected'], node2: ['highlight'] }) },
      { label: 'Clear', run: () => graph.setElementState({ node1: [], node2: [] }) },
    ], { mark: false });
  });

export default mount;
