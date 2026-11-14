// lineDash and lineDashOffset: a dashed edge whose dashes crawl along it
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const edgeOf = (dash: number, gap: number, offset: number): EdgeOptions => ({
  style: { stroke: '#F5222D', lineWidth: 2, lineDash: [dash, gap], lineDashOffset: offset },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let dash = 6;
    let gap = 4;
    let offset = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf(dash, gap, offset),
        // The per-frame offset change is a style update; skip the tween so it steps cleanly.
        animation: false,
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(dash, gap, offset));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'dash', [1, 30, 1], dash, (v) => ((dash = v), void apply()));
      slider(stage.bar, 'gap', [0, 30, 1], gap, (v) => ((gap = v), void apply()));
      slider(stage.bar, 'lineDashOffset', [0, 40, 1], offset, (v) => ((offset = v), void apply()));
    }
    stage.every(120, () => ((offset = (offset + 2) % 40), apply()));
  });

export default mount;
