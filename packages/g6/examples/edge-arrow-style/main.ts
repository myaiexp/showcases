// Arrow fill, stroke, size as [width, height] and endArrowOffset
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const edgeOf = (w: number, h: number, offset: number): EdgeOptions => ({
  style: {
    stroke: '#B37FEB',
    lineWidth: 3,
    endArrow: true,
    endArrowType: 'diamond',
    endArrowSize: [w, h],
    endArrowFill: '#FF4D4F',
    endArrowStroke: '#B37FEB',
    endArrowStrokeOpacity: 0.8,
    endArrowOffset: offset,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let w = 24;
    let h = 12;
    let offset = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf(w, h, offset),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(w, h, offset));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'size width', [4, 40, 1], w, (v) => ((w = v), void apply()));
      slider(stage.bar, 'size height', [4, 40, 1], h, (v) => ((h = v), void apply()));
      slider(stage.bar, 'endArrowOffset', [-20, 20, 1], offset, (v) => ((offset = v), void apply()));
    } else {
      const steps: [number, number, number][] = [[24, 12, 0], [12, 24, 0], [24, 12, 12], [30, 16, -10]];
      stage.every(1200, (i) => ([w, h, offset] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
