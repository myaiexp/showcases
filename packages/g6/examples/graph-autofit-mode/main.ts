// autoFit as 'view' or 'center': a ring wider than the canvas is scaled or only centred
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

type Fit = 'view' | 'center';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        // The ring is wider than the canvas, so the two modes differ.
        data: ring(10, 'n', 300),
        node: { style: { size: 30, labelText: (d) => d.id } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    // autoFit runs on every render(); the zoom is reset first so the difference is visible.
    const fit = async (autoFit: Fit): Promise<void> => {
      await graph.zoomTo(1, false);
      graph.setOptions({ autoFit: { type: autoFit, animation: { duration: 600 } } });
      await graph.render();
    };

    if (stage.bar) select(stage.bar, 'autoFit', ['view', 'center'] as const, 'view', (v) => void fit(v));
    else stage.every(2400, (i) => fit(i % 2 ? 'view' : 'center'));
  });

export default mount;
