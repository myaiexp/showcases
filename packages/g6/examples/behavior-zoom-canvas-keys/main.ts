// zoom-canvas trigger as an object: keyboard shortcuts for zoom in, zoom out and reset
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simKeys } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(5, 4, 50),
        behaviors: [
          {
            type: 'zoom-canvas',
            key: 'zoom',
            trigger: { zoomIn: ['Control', '='], zoomOut: ['Control', '-'], reset: ['Control', '0'] },
            animation: { duration: 250 },
          },
        ],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      const out = readout(el);
      const show = () => (out.textContent = `Click the graph, then Ctrl+= zoom in, Ctrl+- zoom out, Ctrl+0 reset. zoom ${graph.getZoom().toFixed(2)}`);
      show();
      graph.on('aftertransform', show);
    } else {
      const say = overlay(stage);
      const combos: [string, string[]][] = [['Ctrl+=', ['Control', '=']], ['Ctrl+=', ['Control', '=']], ['Ctrl+-', ['Control', '-']], ['Ctrl+0', ['Control', '0']]];
      stage.every(1000, (i) => {
        const [name, keys] = combos[i % combos.length]!;
        say(name);
        return simKeys(stage, graph, keys, 80);
      });
    }
  });

export default mount;
