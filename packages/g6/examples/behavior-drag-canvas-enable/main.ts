// drag-canvas enable and onFinish: switch dragging off, and get a callback when a drag ends
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { line, overlay, simDrag } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Drag the canvas; onFinish counts finished drags.';
    let finished = 0;
    const say = stage.preview ? overlay(stage) : null;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(6, 4, 55),
        node: { style: { size: 16 } },
        behaviors: [
          {
            type: 'drag-canvas',
            key: 'drag',
            enable: true,
            onFinish: () => {
              finished += 1;
              log?.replaceChildren(`onFinish: ${finished} drag(s) finished`);
              say?.(`onFinish x${finished}`);
            },
          },
        ],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) toggle(stage.bar, 'enable', true, (enable) => graph.updateBehavior({ key: 'drag', enable }));
    else {
      stage.every(1500, async (i) => {
        // Every third drag runs with dragging disabled and does not move the view.
        graph.updateBehavior({ key: 'drag', enable: i % 3 !== 0 });
        const [a, b] = i % 2 ? [[190, 180], [60, 100]] : [[60, 25], [190, 110]];
        await simDrag(stage, graph, line(graph.getCanvasByViewport(a as [number, number]), graph.getCanvasByViewport(b as [number, number]), 12), 40);
      });
    }
  });

export default mount;
