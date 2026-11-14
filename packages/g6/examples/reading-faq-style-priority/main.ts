// FAQ: node.style overrides data style unless it is a callback that reads the data first
import { Graph } from '@antv/g6';
import type { NodeData, NodeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// setNode replaces the whole node option, so both variants are written out in full.
const nodeOptions = (dataFirst: boolean): NodeOptions => ({
  style: {
    size: 40,
    labelText: (d: NodeData) => String(d.data?.note),
    labelPlacement: 'bottom',
    // Plain 'pink' wins over whatever the data says; the callback reads the data first.
    fill: dataFirst ? (d: NodeData) => (d.style?.fill as string | undefined) || 'pink' : 'pink',
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
            { id: 'node-1', style: { x: 70, y: 80, fill: 'orange' }, data: { note: 'data fill: orange' } },
            { id: 'node-2', style: { x: 190, y: 80, fill: 'orange' }, data: { note: 'data fill: orange' } },
          ],
          edges: [],
        },
        node: nodeOptions(false),
      }),
    );
    await graph.render();

    const dataFirst = (on: boolean) => {
      graph.setNode(nodeOptions(on));
      return graph.draw();
    };

    if (stage.bar) {
      toggle(stage.bar, 'callback reads data.style.fill first', false, (v) => void dataFirst(v));
    } else {
      stage.every(1500, (i) => dataFirst(i % 2 === 1));
    }
  });

export default mount;
