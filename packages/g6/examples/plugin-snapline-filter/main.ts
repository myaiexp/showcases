// snapline filter: node-0 can be switched out of the alignment targets
import { Graph } from '@antv/g6';
import type { Node } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dragNode } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node-0', style: { x: 70, y: 60 } },
            { id: 'node-1', style: { x: 190, y: 160 } },
            { id: 'node-2', style: { x: 190, y: 40 } },
          ],
          edges: [{ source: 'node-0', target: 'node-1' }],
        },
        node: { style: { fill: (d) => (d.id === 'node-0' ? '#f04864' : '#7e3feb'), size: 28, labelText: (d) => d.id, labelPlacement: 'bottom', labelFill: '#fff' } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['drag-canvas', 'drag-element'],
        autoFit: 'center',
        // node-0 (red) is left out of alignment: node-1 only lines up with node-2.
        plugins: [{ type: 'snapline', key: 'snapline', filter: (node: Node) => node.id !== 'node-0' }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'exclude node-0', true, (on) =>
        graph.updatePlugin({ key: 'snapline', filter: (node: Node) => !on || node.id !== 'node-0' }),
      );
    } else {
      const [, y0 = 0] = graph.getElementPosition('node-0');
      const [x1 = 0, y1 = 0] = graph.getElementPosition('node-1');
      const [, y2 = 0] = graph.getElementPosition('node-2');
      // Alternate: near node-0 (no guide, filtered out), then near node-2 (guide).
      stage.every(1800, (i) => dragNode(graph, 'node-1', [x1, i % 2 ? y0 : i % 4 === 0 ? y1 : y2]));
    }
  });

export default mount;
