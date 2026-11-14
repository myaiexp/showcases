// graph.resize(w, h) and graph.resize(): canvas size versus container size
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 60, 50),
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#4a5a78' } },
        // A grid line pins the canvas bounds to something visible.
        plugins: [{ type: 'grid-line', follow: false }],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    graph.on(GraphEvent.AFTER_SIZE_CHANGE, () => show(`canvas size ${graph.getSize().join(' x ')}`));
    show(`canvas size ${graph.getSize().join(' x ')}`);

    if (stage.bar) {
      let w = 400;
      let h = 300;
      slider(stage.bar, 'width', [200, 900, 20], w, (v) => ((w = v), graph.resize(w, h)));
      slider(stage.bar, 'height', [150, 560, 10], h, (v) => ((h = v), graph.resize(w, h)));
      button(stage.bar, 'resize()', () => graph.resize());
    } else {
      const sizes: [number, number][] = [[160, 120], [250, 200], [200, 150]];
      stage.every(1300, (i) => graph.resize(...sizes[i % sizes.length]!));
    }
  });

export default mount;
