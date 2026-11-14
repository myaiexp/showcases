// getAncestorsData(id, hierarchy) returns every ancestor, from the parent up to the root
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { hierarchy, hierarchyLayout, loadHierarchy, probe, type Hierarchy } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let kind: Hierarchy = 'tree';
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
      select(stage.bar, 'hierarchy', ['tree', 'combo'] as const, kind, async (v) => ((kind = v), (ids = await loadHierarchy(graph, v))));
    }
    await probe(stage, graph, el, () => ids, (id) => {
      const ancestors = graph.getAncestorsData(id, kind);
      return { found: ancestors.map((a) => String(a.id)), text: `getAncestorsData('${id}', '${kind}') -> [${ancestors.map((a) => a.id).join(' > ')}]` };
    });
  });

export default mount;
