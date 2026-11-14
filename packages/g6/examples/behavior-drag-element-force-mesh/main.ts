// drag-element-force: dragging a node re-runs the d3-force layout, so the mesh stretches
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

function mesh(size: number) {
  const nodes = Array.from({ length: size * size }, (_, i) => ({ id: `${i}` }));
  const edges: { source: string; target: string }[] = [];
  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      if (y > 0) edges.push({ source: `${(y - 1) * size + x}`, target: `${y * size + x}` });
      if (x > 0) edges.push({ source: `${y * size + (x - 1)}`, target: `${y * size + x}` });
    }
  }
  return { nodes, edges };
}

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: mesh(stage.preview ? 7 : 10),
        layout: { type: 'd3-force', manyBody: { strength: -30 }, link: { strength: 1, distance: 20, iterations: 10 } },
        node: { style: { size: 8 } },
        behaviors: [{ type: 'drag-element-force' }, 'zoom-canvas'],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Drag a node of the mesh: the layout recalculates while you drag.';
    else {
      // Pull the middle node out to the right, then back to where the mesh holds it.
      stage.every(2400, async (i) => {
        const p = graph.getElementPosition('24');
        const to: [number, number] = [p[0] + (i % 2 ? 60 : -60), p[1] - 20];
        await simDrag(stage, graph, line(p, to, 12), 40);
      });
    }
  });

export default mount;
