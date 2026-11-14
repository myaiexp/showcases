// grid-line plugin with its default options
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
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
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        autoFit: 'view',
        padding: 24,
        plugins: ['grid-line'],
      }),
    );
    await graph.render();

    // The grid is fixed to the viewport: move the nodes under it.
    if (stage.preview) {
      stage.every(1400, (i) => {
        graph.updateNodeData(graph.getNodeData().map((n) => ({ id: n.id, style: { fill: i % 2 ? '#7e3feb' : '#1783ff' } })));
        return graph.draw();
      });
    }
  });

export default mount;
