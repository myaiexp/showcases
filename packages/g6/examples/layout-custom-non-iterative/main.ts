// The docs' DiagonalLayout: execute() maps each node to a point on a diagonal
import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';
import type { GraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

class DiagonalLayout extends BaseLayout {
  id = 'showcase-layout-diagonal';

  async execute(data: GraphData): Promise<GraphData> {
    const { nodes = [] } = data;
    return {
      nodes: nodes.map((node, index) => ({
        id: node.id,
        style: { x: 50 * index + 25, y: 50 * index + 25 },
      })),
    };
  }
}

// register() is global and keeps the first-registered class under the name; a second mount just overrides it.
register(ExtensionCategory.LAYOUT, 'showcase-layout-diagonal', DiagonalLayout);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }] },
        node: { style: { size: 24, labelText: (d) => d.id, labelPlacement: 'bottom', labelFill: '#fff' } },
        layout: { type: 'showcase-layout-diagonal' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // Dragging moves a node off the diagonal; layout() snaps everything back.
    if (stage.bar) {
      button(stage.bar, 'layout()', () => graph.layout());
    } else {
      stage.every(1600, async (i) => {
        graph.updateNodeData([{ id: 'node-2', style: { x: 200, y: i % 2 ? 20 : 220 } }]);
        await graph.draw();
        await new Promise((r) => setTimeout(r, 700));
        await graph.layout();
      });
    }
  });

export default mount;
