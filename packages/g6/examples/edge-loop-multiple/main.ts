// Several loops on one node, each placed and coloured by a function of its edge id
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const PLACE = ['top', 'right', 'bottom'] as const;
const COLORS = ['#1890FF', '#52C41A', '#B37FEB'];
const edgeOf = (clockwise: boolean): EdgeOptions => ({
  style: {
    lineWidth: 2,
    endArrow: true,
    loopPlacement: (d) => PLACE[Number(String(d.id).slice(-1)) - 1]!,
    loopClockwise: clockwise,
    loopDist: 25,
    stroke: (d) => COLORS[Number(String(d.id).slice(-1)) - 1]!,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 70,
        data: {
          nodes: [{ id: 'node1', style: { x: 140, y: 100 } }],
          // Loops on one node share a source and target, so each needs its own id.
          edges: [1, 2, 3].map((n) => ({ id: `loop-${n}`, source: 'node1', target: 'node1' })),
        },
        edge: edgeOf(true),
      }),
    );
    await graph.render();
    const set = async (v: boolean): Promise<void> => {
      graph.setEdge(edgeOf(v));
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'loopClockwise', true, (v) => void set(v));
    else stage.every(1500, (i) => set(i % 2 === 0));
  });

export default mount;
