// labelOffsetX moves the label along the edge, labelOffsetY away from it
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { diagonal } from '../../shared/edge-data.ts';

const edgeOf = (x: number, y: number): EdgeOptions => ({
  style: { stroke: '#5CACEE', labelText: `offset ${x}, ${y}`, labelOffsetX: x, labelOffsetY: y, labelAutoRotate: true, labelFontSize: 11 },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let x = 0;
    let y = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: diagonal(),
        edge: edgeOf(x, y),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(x, y));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'labelOffsetX', [-50, 50, 1], x, (v) => ((x = v), void apply()));
      slider(stage.bar, 'labelOffsetY', [-50, 50, 1], y, (v) => ((y = v), void apply()));
    } else {
      const steps: [number, number][] = [[0, 0], [30, 0], [0, -20], [-30, 14]];
      stage.every(1100, (i) => ([x, y] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
