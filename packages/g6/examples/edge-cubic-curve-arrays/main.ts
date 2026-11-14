// Cubic curveOffset and curvePosition as two-element arrays, one value per control point
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const edgeOf = (o1: number, o2: number, p1: number, p2: number): EdgeOptions => ({
  type: 'cubic',
  style: { stroke: '#13C2C2', lineWidth: 2, curveOffset: [o1, o2], curvePosition: [p1, p2], endArrow: true },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { o1: 40, o2: -40, p1: 0.25, p2: 0.75 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 40,
        data: {
          nodes: [
            { id: 'a', style: { x: 30, y: 100 } },
            { id: 'b', style: { x: 250, y: 100 } },
          ],
          edges: [{ source: 'a', target: 'b' }],
        },
        edge: edgeOf(v.o1, v.o2, v.p1, v.p2),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(v.o1, v.o2, v.p1, v.p2));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'curveOffset[0]', [-100, 100, 1], v.o1, (x) => ((v.o1 = x), void apply()));
      slider(stage.bar, 'curveOffset[1]', [-100, 100, 1], v.o2, (x) => ((v.o2 = x), void apply()));
      slider(stage.bar, 'curvePosition[0]', [0, 1, 0.05], v.p1, (x) => ((v.p1 = x), void apply()));
      slider(stage.bar, 'curvePosition[1]', [0, 1, 0.05], v.p2, (x) => ((v.p2 = x), void apply()));
    } else {
      const steps: [number, number][] = [[40, -40], [-50, 50], [60, 60], [0, 0]];
      stage.every(1200, (i) => ([v.o1, v.o2] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
