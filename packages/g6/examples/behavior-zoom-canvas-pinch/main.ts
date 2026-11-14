// zoom-canvas enable with ctrlKey: pinch zooms, a two-finger swipe scrolls
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simWheel } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(7, 5, 55),
        node: { style: { size: 16 } },
        behaviors: [
          'scroll-canvas',
          // Touchpads report a pinch as a wheel event with ctrlKey set; a swipe has it unset.
          { key: 'pinch-zoom', type: 'zoom-canvas', enable: (event: WheelEvent) => event.ctrlKey },
        ],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Swipe with two fingers to scroll, pinch to zoom. With a mouse, Ctrl + wheel zooms and the wheel scrolls.';
    else {
      const say = overlay(stage);
      stage.every(450, (i) => {
        const phase = (i - 1) % 12;
        const pinch = phase >= 6;
        say(pinch ? 'ctrlKey: true -> zoom' : 'ctrlKey: false -> scroll');
        simWheel(graph, [130, 100], pinch ? (phase < 9 ? -50 : 50) : phase < 3 ? 50 : -50, 0, pinch);
      });
    }
  });

export default mount;
