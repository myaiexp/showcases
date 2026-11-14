// zoom-canvas origin: zoom around the pointer, or around a fixed point such as the centre
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simWheel } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const origins = ['pointer', 'viewport centre'] as const;
type Origin = (typeof origins)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(5, 4, 50),
        behaviors: [{ type: 'zoom-canvas', key: 'zoom' }],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    // origin is in viewport coordinates; setBehaviors drops it again for 'pointer'
    // (updateBehavior would keep the old value, since it ignores undefined).
    const apply = (o: Origin) =>
      graph.setBehaviors([o === 'pointer' ? { type: 'zoom-canvas', key: 'zoom' } : { type: 'zoom-canvas', key: 'zoom', origin: graph.getViewportCenter() as [number, number] }]);
    if (stage.bar) {
      readout(el).textContent = 'Put the pointer near a corner and scroll: the view zooms toward the pointer or toward the centre.';
      select(stage.bar, 'origin', origins, 'pointer', apply);
    } else {
      const say = overlay(stage);
      stage.every(450, async (i) => {
        const phase = (i - 1) % 12;
        if (phase === 0) {
          const o = origins[Math.floor((i - 1) / 12) % origins.length]!;
          apply(o);
          say(`origin: ${o}`);
          await graph.zoomTo(1, false);
          await graph.translateTo([0, 0], false);
        }
        // Zoom in with the pointer near the top-left corner, then out again.
        simWheel(graph, graph.getCanvasByViewport([40, 30]), phase < 6 ? -50 : 50);
      });
    }
  });

export default mount;
