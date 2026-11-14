// snapline tolerance, offset, autoSnap and the two line styles
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
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
            { id: 'node-0', style: { x: 70, y: 50 } },
            { id: 'node-1', style: { x: 190, y: 50 } },
            { id: 'node-2', style: { x: 70, y: 150 } },
            { id: 'node-3', style: { x: 190, y: 170 } },
            { id: 'node-4', style: { x: 130, y: 100 } },
          ],
          edges: [{ source: 'node-0', target: 'node-1' }, { source: 'node-2', target: 'node-3' }],
        },
        node: { style: { fill: '#7e3feb', size: 28 } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['drag-canvas', 'drag-element'],
        autoFit: 'center',
        plugins: [
          {
            type: 'snapline',
            key: 'snapline',
            tolerance: 8,
            offset: 30,
            autoSnap: false,
            verticalLineStyle: { stroke: '#f04864', lineWidth: 2, lineDash: [6, 4] },
            horizontalLineStyle: { stroke: '#1890ff', lineWidth: 2 },
          },
        ],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'snapline', ...o });
    if (stage.bar) {
      slider(stage.bar, 'tolerance', [1, 20, 1], 8, (tolerance) => up({ tolerance }));
      slider(stage.bar, 'offset', [1, 60, 1], 30, (offset) => up({ offset }));
      toggle(stage.bar, 'autoSnap', false, (autoSnap) => up({ autoSnap }));
    } else {
      const [, y2 = 0] = graph.getElementPosition('node-2');
      const [x3 = 0, y3 = 0] = graph.getElementPosition('node-3');
      stage.every(1800, (i) => dragNode(graph, 'node-3', i % 2 ? [x3, y2] : [x3, y3]));
    }
  });

export default mount;
