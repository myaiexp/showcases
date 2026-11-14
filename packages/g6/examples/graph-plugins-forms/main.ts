// plugins as a string, an object with a key, and a function that reads the graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(9, 'n', 90),
        node: { style: { size: 22 } },
        autoFit: 'view',
        behaviors: ['drag-canvas', 'zoom-canvas'],
        plugins: [
          // String form: default configuration.
          'minimap',
          // Object form: options, and a key so updatePlugin can address it.
          { type: 'grid-line', key: 'grid-plugin', stroke: '#26324f', size: 24, border: false },
          // Function form: `this` is the graph.
          function (this: Graph) {
            return { type: 'watermark', text: `${this.getNodeData().length} nodes`, textFill: '#5b6b94', opacity: 0.5 };
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      let on = true;
      button(stage.bar, 'Toggle grid colour', () => {
        on = !on;
        graph.updatePlugin({ key: 'grid-plugin', stroke: on ? '#26324f' : '#7a5a2a' });
      });
    } else {
      stage.every(1600, (i) => graph.translateBy([i % 2 ? -30 : 30, 0], { duration: 1000 }));
    }
  });

export default mount;
