// A self-loop edge: loopPlacement, loopDist and the loop switch
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const;
type Placement = (typeof PLACEMENTS)[number];
const edgeOf = (loop: boolean, placement: Placement, dist: number): EdgeOptions => ({
  style: { stroke: '#1890FF', lineWidth: 2, endArrow: true, loop, loopPlacement: placement, loopDist: dist },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let loop = true;
    let placement: Placement = 'top';
    let dist = 30;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 70,
        data: { nodes: [{ id: 'node1', style: { x: 140, y: 100 } }], edges: [{ source: 'node1', target: 'node1' }] },
        edge: edgeOf(loop, placement, dist),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(loop, placement, dist));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'loop', loop, (v) => ((loop = v), void apply()));
      select(stage.bar, 'loopPlacement', PLACEMENTS, placement, (v) => ((placement = v), void apply()));
      slider(stage.bar, 'loopDist', [10, 100, 1], dist, (v) => ((dist = v), void apply()));
    } else {
      stage.every(1000, (i) => ((placement = PLACEMENTS[i % 4]!), (dist = i % 2 ? 40 : 25), apply()));
    }
  });

export default mount;
