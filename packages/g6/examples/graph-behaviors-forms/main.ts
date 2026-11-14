// behaviors as a string, an object with a key and enable test, and a function
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(8, 'n', 90),
        node: { style: { size: 26, labelText: (d) => d.id } },
        autoFit: 'view',
        behaviors: [
          // String form: the behavior's default configuration.
          'drag-canvas',
          'zoom-canvas',
          // Object form: options, plus a key to find it again. Only nodes can be dragged.
          {
            type: 'drag-element',
            key: 'drag-node-only',
            enable: (event: { targetType?: string }) => event.targetType === 'node',
          },
          // Function form: `this` is the graph, so the config can depend on it.
          function (this: Graph) {
            if (log) log.textContent = `function form ran with this = Graph holding ${this.getNodeData().length} nodes`;
            return { type: 'hover-activate' };
          },
        ],
      }),
    );
    await graph.render();

    // No pointer in a card: show the activate state hover-activate would set.
    if (stage.preview) stage.every(900, (i) => graph.setElementState({ [`n${(i + 7) % 8}`]: [], [`n${i % 8}`]: 'active' }));
  });

export default mount;
