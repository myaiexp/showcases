// toDataURL mode viewport (what is on screen) versus overall (the full bounds)
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { gridData, imageBox } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

type Mode = 'viewport' | 'overall';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [6, 4, 50] : [9, 6, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 20, 20),
        node: { style: { size: 16, fill: '#5b8ff9' } },
        edge: { style: { stroke: '#8896b3' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();
    // Zoom in so the graph overflows the canvas: the two modes then differ.
    await graph.zoomTo(1.6, false);
    const show = imageBox(stage, el);
    const exportAs = async (mode: Mode) => {
      const url = await graph.toDataURL({ mode });
      show(url, `mode: ${mode}\nviewport mode is clipped to the canvas, overall mode covers every node`);
    };
    await exportAs('viewport');

    if (stage.bar) {
      select(stage.bar, 'mode', ['viewport', 'overall'] as const, 'viewport', (m) => void exportAs(m));
    } else {
      stage.every(1800, (i) => exportAs(i % 2 ? 'overall' : 'viewport'));
    }
  });

export default mount;
