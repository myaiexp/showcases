// Graph.destroy() releases the instance for good; a new Graph is needed to draw again
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rebuildable, ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const live = rebuildable(
      stage,
      () =>
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: ring(9, 'n', 80),
          node: { style: { size: 22, labelText: (d) => d.id } },
          autoFit: 'view',
        }),
    );
    await live.rebuild();

    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `graph.destroyed = ${live.graph?.destroyed}   canvases in container: ${stage.container.querySelectorAll('canvas').length}`;
      };
      show();
      button(stage.bar, 'destroy()', () => {
        live.graph?.destroy();
        show();
      });
      button(stage.bar, 'new Graph(...) and render()', () => void live.rebuild().then(show));
    } else {
      // Destroy, then build a fresh graph on the same container.
      stage.every(1500, (i) => {
        if (i % 2) return live.rebuild();
        live.graph?.destroy();
      });
    }
  });

export default mount;
