// All labelPlacement values, one node each, labelled with its own value
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const PLACEMENTS = [
  'left', 'top', 'right', 'bottom',
  'left-top', 'top-left', 'top-right', 'right-top',
  'left-bottom', 'bottom-left', 'bottom-right', 'right-bottom',
  'center',
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: { nodes: PLACEMENTS.map((id) => ({ id })) },
        node: {
          type: 'rect',
          style: {
            size: [70, 40],
            fill: '#2a3550',
            stroke: '#5B8FF9',
            labelText: (d: NodeData) => d.id,
            labelPlacement: (d: NodeData) => d.id as 'left',
            labelFontSize: 10,
            labelFill: '#F6BD16',
          },
          state: { selected: { stroke: '#61DDAA', lineWidth: 2 } },
        },
        layout: { type: 'grid', cols: 4, sortBy: 'id', nodeSize: 130 },
      }),
    );
    await graph.render();

    // Highlight one node at a time so the eye can match the label to its node.
    const step = (i: number): Promise<void> =>
      graph.setElementState(Object.fromEntries(PLACEMENTS.map((p, k) => [p, k === i % PLACEMENTS.length ? ['selected'] : []])));
    if (stage.bar) await step(0);
    else stage.every(700, step);
  });

export default mount;
