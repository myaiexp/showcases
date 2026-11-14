// Polyline router: none, orth, or shortest-path around an obstacle node
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const ROUTERS = ['none', 'orth', 'shortest-path'] as const;
type Router = (typeof ROUTERS)[number];
const edgeOf = (r: Router): EdgeOptions => ({
  type: 'polyline',
  style: {
    stroke: '#7e3feb',
    lineWidth: 2,
    endArrow: true,
    labelText: `router: ${r}`,
    labelBackground: true,
    labelFill: '#222',
    labelBackgroundFill: '#f9f0ff',
    labelAutoRotate: false,
    router: r === 'none' ? false : r === 'orth' ? { type: 'orth' } : { type: 'shortest-path', enableObstacleAvoidance: true, gridSize: 10 },
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let router: Router = 'orth';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'a', style: { x: 30, y: 40 } },
            { id: 'b', style: { x: 250, y: 150 } },
            // An obstacle the shortest-path router steers around.
            { id: 'wall', style: { x: 140, y: 95, size: [40, 70], fill: '#434343' } },
          ],
          edges: [{ id: 'e', source: 'a', target: 'b' }],
        },
        edge: edgeOf(router),
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const set = async (r: Router): Promise<void> => {
      router = r;
      graph.setEdge(edgeOf(r));
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'router', ROUTERS, router, (v) => void set(v));
    else stage.every(1500, (i) => set(ROUTERS[i % 3]!));
  });

export default mount;
