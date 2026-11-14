// force-atlas2 barnesHut and prune toggles
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force-atlas2', preventOverlap: true, kr: 20, barnesHut: false, prune: false, nodeSize: 10 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('relations'),
        node: {
          style: { size: 10 },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'barnesHut', false, (barnesHut) => relayout(graph, layout, { barnesHut }));
      toggle(stage.bar, 'prune', false, (prune) => relayout(graph, layout, { prune }));
    } else {
      const steps = [{ barnesHut: true, prune: true }, { barnesHut: false, prune: false }];
      stage.every(3000, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
