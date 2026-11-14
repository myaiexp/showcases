// The three ways to write an entry in the plugins array
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 24,
        behaviors: ['drag-canvas', 'drag-element'],
        plugins: [
          // 1. Type name: default options.
          'snapline',
          // 2. Object: options plus a key for later updates.
          { type: 'minimap', key: 'overview', size: [120, 80], position: 'right-bottom' },
          // 3. Function: called with the graph as `this`, returns the object form.
          function (this: Graph) {
            return { type: 'watermark', text: this.getNodeData().length + ' nodes', textFill: '#fff', opacity: 0.12 };
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      const out = readout(el);
      out.textContent = graph
        .getPlugins()
        .map((p) => (typeof p === 'string' ? `string   ${p}` : typeof p === 'function' ? 'function (this: Graph) => options' : `object   ${p.type} key=${String(p.key)}`))
        .join('\n');
    } else {
      stage.every(1400, (i) => graph.translateBy([i % 2 ? 30 : -30, i % 2 ? 12 : -12], { duration: 1000 }));
    }
  });

export default mount;
