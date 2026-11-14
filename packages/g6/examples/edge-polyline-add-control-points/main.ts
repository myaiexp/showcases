// Adding points to an edge controlPoints one at a time, each marked by a small node
import { Graph, type NodeData, type Point } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const POINTS: Point[] = [[90, 150], [150, 30], [210, 150], [240, 60], [70, 70]];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'node1', style: { x: 30, y: 100 } },
            { id: 'node2', style: { x: 270, y: 100, labelText: 'Drag Me!', labelPadding: [1, 5], labelBackground: true, labelBackgroundRadius: 10, labelBackgroundFill: '#99add1', labelFill: '#222' } },
          ],
          edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
        },
        edge: { type: 'polyline', style: { stroke: '#7e3feb', lineWidth: 2, router: { type: 'orth' } } },
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();

    let used = 0;
    const add = async (): Promise<void> => {
      if (used >= POINTS.length) {
        // Start over: drop the marker nodes and the control points.
        graph.removeNodeData(POINTS.map((_, i) => `cp-${i}`));
        graph.updateEdgeData([{ id: 'edge1', style: { controlPoints: [] } }]);
        used = 0;
      } else {
        const [x, y] = POINTS[used]!;
        const marker: NodeData = { id: `cp-${used}`, style: { x, y, size: 6, fill: '#7e3feb' } };
        graph.addNodeData([marker]);
        used++;
        graph.updateEdgeData([{ id: 'edge1', style: { controlPoints: POINTS.slice(0, used) } }]);
      }
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'add a control point (a sixth click resets)', () => void add());
    else stage.every(1000, add);
  });

export default mount;
