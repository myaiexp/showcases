// Every GraphEvent name, in firing order, as a graph is created, rendered, redrawn and destroyed
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { sleep } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { button } from '../../shared/controls.ts';
import { ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 30, 3);
    let runs = 0;
    // Each pass builds a fresh graph on the same container, so the whole life shows, canvas init to destroy.
    const lifeOf = async (): Promise<void> => {
      if (!stage.alive) return;
      const graph = stage.keep(
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: ring(5, 'n', 44),
          node: { style: { size: 24 } },
          autoFit: 'center',
          animation: false,
        }),
      );
      // Repeats of one name are folded into "name xN".
      const lines: string[] = [];
      let last = '';
      let repeats = 0;
      const flush = (): void => {
        if (last) lines.push(repeats > 1 ? `${last} x${repeats}` : last);
        last = '';
        repeats = 0;
      };
      for (const name of Object.values(GraphEvent)) {
        graph.on(name, () => {
          if (name !== last) flush();
          last = name;
          repeats++;
        });
      }
      let shown = 0;
      const show = (): void => {
        flush();
        // The card prints a line per tick, or its three visible lines would only ever show the last three.
        lines.slice(shown).forEach((l, i) => (stage.bar ? log(l) : stage.after((i + 1) * 110, () => log(l))));
        shown = lines.length;
      };
      log(`--- run ${++runs}`);
      await graph.render();
      graph.updateNodeData([{ id: 'n0', style: { fill: '#F6BD16' } }]);
      await graph.draw();
      show();
      await sleep(stage.bar ? 0 : 3200);
      if (!stage.alive || graph.destroyed) return;
      graph.destroy();
      show();
    };
    if (stage.bar) button(stage.bar, 'build, render, draw and destroy a graph', () => void lifeOf());
    else {
      void lifeOf();
      stage.every(7000, lifeOf);
    }
  });

export default mount;
