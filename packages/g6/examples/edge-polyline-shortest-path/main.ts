// shortest-path router options: obstacle avoidance, offset and gridSize
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const edgeOf = (avoid: boolean, offset: number, grid: number): EdgeOptions => ({
  type: 'polyline',
  style: {
    stroke: '#36CFC9',
    lineWidth: 2,
    endArrow: true,
    router: { type: 'shortest-path', enableObstacleAvoidance: avoid, offset, gridSize: grid },
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let avoid = true;
    let offset = 10;
    let grid = 10;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'a', style: { x: 30, y: 100 } },
            { id: 'b', style: { x: 250, y: 100 } },
            { id: 'o1', style: { x: 110, y: 100, size: [30, 90], fill: '#434343' } },
            { id: 'o2', style: { x: 180, y: 60, size: [30, 70], fill: '#434343' } },
          ],
          edges: [{ id: 'e', source: 'a', target: 'b' }],
        },
        edge: edgeOf(avoid, offset, grid),
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(avoid, offset, grid));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'enableObstacleAvoidance', avoid, (v) => ((avoid = v), void apply()));
      slider(stage.bar, 'offset', [0, 40, 1], offset, (v) => ((offset = v), void apply()));
      slider(stage.bar, 'gridSize', [2, 30, 1], grid, (v) => ((grid = v), void apply()));
    } else {
      stage.every(1300, (i) => ((avoid = i % 2 === 0), (grid = i % 4 < 2 ? 10 : 20), apply()));
    }
  });

export default mount;
