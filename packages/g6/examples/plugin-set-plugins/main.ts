// graph.setPlugins adds, removes and clears plugins on a live graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

// The default grid stroke (#eee) is near-white on the dark canvas.
const grid = { type: 'grid-line', stroke: '#22304f' };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 24,
        plugins: [grid],
      }),
    );
    await graph.render();

    const names = (): string =>
      JSON.stringify(graph.getPlugins().map((p) => (typeof p === 'string' ? p : typeof p === 'function' ? 'fn' : p.type)));
    const addMinimap = (): void => graph.setPlugins((plugins) => [...plugins, 'minimap']);
    const removeGrid = (): void => graph.setPlugins((plugins) => plugins.filter((p) => typeof p === 'string' || typeof p === 'function' || p.type !== 'grid-line'));
    const clear = (): void => graph.setPlugins([]);
    const reset = (): void => graph.setPlugins([grid]);

    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `getPlugins() -> ${names()}`;
      };
      show();
      const run = (fn: () => void) => (): void => {
        fn();
        show();
      };
      button(stage.bar, 'add minimap', run(addMinimap));
      button(stage.bar, 'remove grid-line', run(removeGrid));
      button(stage.bar, 'setPlugins([])', run(clear));
      button(stage.bar, 'reset', run(reset));
    } else {
      // Walk through the four calls; each one changes what is drawn around the graph.
      const steps = [addMinimap, removeGrid, clear, reset];
      stage.every(1500, (i) => steps[(i - 1) % steps.length]!());
    }
  });

export default mount;
