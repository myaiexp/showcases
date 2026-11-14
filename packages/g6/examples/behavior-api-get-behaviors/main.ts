// graph.getBehaviors: read the configured behaviors back, including keys and options
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { button, readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        behaviors: ['drag-canvas', { type: 'zoom-canvas', key: 'zoom', sensitivity: 1 }, { type: 'click-select', key: 'select' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const summary = () => JSON.stringify(graph.getBehaviors());
    if (stage.bar) {
      const out = readout(el);
      const show = () => (out.textContent = `getBehaviors() -> ${summary()}`);
      show();
      slider(stage.bar, 'zoom sensitivity', [0.5, 3, 0.5], 1, (sensitivity) => {
        graph.updateBehavior({ key: 'zoom', sensitivity });
        show();
      });
      button(stage.bar, 'add hover-activate', () => {
        graph.setBehaviors((b) => [...b, 'hover-activate']);
        show();
      });
      button(stage.bar, 'clear', () => {
        graph.setBehaviors([]);
        show();
      });
    } else {
      const say = overlay(stage);
      stage.every(1800, (i) => {
        const phase = i % 4;
        if (phase === 1) graph.updateBehavior({ key: 'zoom', sensitivity: 2 });
        if (phase === 2) graph.setBehaviors((b) => [...b, 'hover-activate']);
        if (phase === 3) graph.setBehaviors(['drag-canvas', { type: 'zoom-canvas', key: 'zoom', sensitivity: 1 }, { type: 'click-select', key: 'select' }]);
        const b = graph.getBehaviors();
        say(`getBehaviors().length = ${b.length}`);
      });
    }
  });

export default mount;
