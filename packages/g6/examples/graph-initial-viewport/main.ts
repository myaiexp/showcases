// zoom, x, y and rotation set the starting viewport; they are read once, at construction
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rebuildable, ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const w = stage.container.clientWidth;
    const h = stage.container.clientHeight;
    // x and y place the origin; start with it in the middle of the canvas.
    const view = { zoom: 1, x: w / 2, y: h / 2, rotation: 0 };

    const live = rebuildable(
      stage,
      () =>
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: ring(8, 'n', 70),
          node: { style: { size: 20, labelText: (d) => d.id } },
          zoom: view.zoom,
          x: view.x,
          y: view.y,
          rotation: view.rotation,
        }),
    );
    await live.rebuild();

    if (stage.bar) {
      const bar = stage.bar;
      slider(bar, 'zoom', [0.5, 3, 0.1], 1, (v) => ((view.zoom = v), void live.rebuild()));
      slider(bar, 'x', [0, Math.round(w), 10], view.x, (v) => ((view.x = v), void live.rebuild()));
      slider(bar, 'y', [0, h, 10], view.y, (v) => ((view.y = v), void live.rebuild()));
      slider(bar, 'rotation (rad)', [0, 6.28, 0.1], 0, (v) => ((view.rotation = v), void live.rebuild()));
    } else {
      stage.every(1800, (i) => {
        view.x = w / 2 + (i % 2 ? 30 : 0);
        view.zoom = 1 + (i % 3) * 0.4;
        view.rotation = (i % 4) * 0.4;
        return live.rebuild();
      });
    }
  });

export default mount;
