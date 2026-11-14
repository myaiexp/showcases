// Edge shadow: shadowColor, shadowBlur and the two offsets
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const edgeOf = (blur: number, dx: number, dy: number): EdgeOptions => ({
  style: { stroke: '#B37FEB', lineWidth: 3, shadowColor: 'rgba(179, 127, 235, 0.9)', shadowBlur: blur, shadowOffsetX: dx, shadowOffsetY: dy },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let blur = 8;
    let dx = 2;
    let dy = 6;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf(blur, dx, dy),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(blur, dx, dy));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'shadowBlur', [0, 30, 1], blur, (v) => ((blur = v), void apply()));
      slider(stage.bar, 'shadowOffsetX', [-20, 20, 1], dx, (v) => ((dx = v), void apply()));
      slider(stage.bar, 'shadowOffsetY', [-20, 20, 1], dy, (v) => ((dy = v), void apply()));
    } else {
      stage.every(1200, (i) => ((blur = [2, 14, 24][i % 3]!), (dy = [2, 8, -8][i % 3]!), apply()));
    }
  });

export default mount;
