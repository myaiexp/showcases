// width and height fix the canvas size; without them G6 reads the container
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const w0 = Math.round(stage.container.clientWidth * 0.6);
    const h0 = Math.round(stage.container.clientHeight * 0.7);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(10, 'n', 60),
        node: { style: { size: 18 } },
        autoFit: 'center',
        width: w0,
        height: h0,
      }),
    );
    await graph.render();

    // Setting width or height through setOptions resizes the canvas in place.
    const resize = async (width: number, height: number): Promise<void> => {
      graph.setOptions({ width, height });
      await graph.fitCenter();
    };

    if (stage.bar) {
      let w = w0;
      let h = h0;
      slider(stage.bar, 'width', [120, Math.max(w0, 1000), 10], w, (v) => ((w = v), void resize(w, h)));
      slider(stage.bar, 'height', [120, stage.container.clientHeight, 10], h, (v) => ((h = v), void resize(w, h)));
    } else {
      const sizes: [number, number][] = [[w0, h0], [w0 * 0.6, h0 * 0.6], [w0 * 1.3, h0 * 0.9]];
      stage.every(1500, (i) => resize(...sizes[i % 3]!));
    }
  });

export default mount;
