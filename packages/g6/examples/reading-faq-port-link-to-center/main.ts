// FAQ: portLinkToCenter true links an edge to the node center, not its port
import { Graph } from '@antv/g6';
import type { NodeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// setNode replaces the whole node option, so the toggle passes the full object.
const nodeOptions = (portLinkToCenter: boolean): NodeOptions => ({
  type: 'rect',
  style: {
    size: [70, 40],
    portR: 4,
    portFill: '#ff7a45',
    portLinkToCenter,
    ports: [
      { key: 'left', placement: 'left' },
      { key: 'right', placement: 'right' },
    ],
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', style: { x: 60, y: 90 } },
            { id: 'b', style: { x: 200, y: 90 } },
          ],
          edges: [{ id: 'a-b', source: 'a', target: 'b', style: { sourcePort: 'right', targetPort: 'left' } }],
        },
        node: nodeOptions(false),
        edge: { style: { lineWidth: 2, stroke: '#8896b3', endArrow: true } },
      }),
    );
    await graph.render();

    const apply = (v: boolean) => {
      graph.setNode(nodeOptions(v));
      return graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'portLinkToCenter', false, (v) => void apply(v));
    else stage.every(1500, (i) => apply(i % 2 === 1));
  });

export default mount;
