// A custom plugin that supplies the graph's data itself
import { BasePlugin, ExtensionCategory, Graph, register } from '@antv/g6';
import type { BasePluginOptions, RuntimeContext } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

class RemoteDataSource extends BasePlugin<BasePluginOptions> {
  constructor(context: RuntimeContext, options: BasePluginOptions) {
    super(context, options);
    void this.loadData();
  }

  private async loadData(): Promise<void> {
    // Stands in for a request; a card must not fetch.
    const data = {
      nodes: [
        { id: 'node-1', style: { x: 25, y: 50 } },
        { id: 'node-2', style: { x: 175, y: 50 } },
        { id: 'node-3', style: { x: 100, y: 130 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3' },
      ],
    };
    const { graph } = this.context;
    graph.setData(data);
    await graph.render();
  }
}

register(ExtensionCategory.PLUGIN, 'showcase-plugin-remote-data-source', RemoteDataSource);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        node: { style: { fill: '#7e3feb', size: 28 } },
        edge: { style: { stroke: '#8b9baf' } },
        // No `data`: the plugin supplies it.
        plugins: ['showcase-plugin-remote-data-source'],
      }),
    );
    await graph.render();
    // Pulse the nodes so the card is not a still frame.
    stage.every(1500, (i) => {
      graph.updateNodeData((nodes) => nodes.map((n) => ({ id: n.id, style: { fill: i % 2 ? '#7e3feb' : '#1783ff' } })));
      return graph.draw();
    });
  });

export default mount;
