// getDescendantsData(id) returns every node below a tree node or combo, at any depth
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { hierarchy, hierarchyLayout, loadHierarchy, probe } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let ids = hierarchy('tree').ids;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hierarchy('tree').data,
        node: { style: { size: 26, labelText: (d) => d.id } },
        combo: { style: { labelText: (d) => d.id } },
        layout: hierarchyLayout('tree'),
        autoFit: 'view',
        animation: false,
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'hierarchy', ['tree', 'combo'] as const, 'tree', async (v) => (ids = await loadHierarchy(graph, v)));
    }
    await probe(stage, graph, el, () => ids, (id) => {
      const below = graph.getDescendantsData(id);
      return { found: below.map((d) => String(d.id)), text: `getDescendantsData('${id}') -> [${below.map((d) => d.id).join(', ')}]` };
    });
  });

export default mount;
