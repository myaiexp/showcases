// The edge option: polyline type, arrow, width, and a selected state
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const pos = [[0, 0], [160, 0], [160, 100], [330, 100], [330, 0]] as const;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: pos.map(([x, y], i) => ({ id: `n${i}`, style: { x, y } })),
          edges: [0, 1, 2, 3].map((i) => ({ id: `e${i}`, source: `n${i}`, target: `n${i + 1}` })),
        },
        node: { style: { size: 22 } },
        edge: {
          type: 'polyline',
          style: { stroke: '#91d5ff', lineWidth: 2, endArrow: true },
          state: { selected: { stroke: '#1890ff', lineWidth: 5 } },
        },
        autoFit: 'view',
        behaviors: ['click-select'],
      }),
    );
    await graph.render();

    // Click an edge to select it; the card walks the selection along the path.
    if (stage.preview) stage.every(900, (i) => graph.setElementState({ [`e${(i + 3) % 4}`]: [], [`e${i % 4}`]: 'selected' }));
  });

export default mount;
