// getComboData() with no argument, one id, or an array of ids; a combo lists its children
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, hierarchy, json } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hierarchy('combo').data,
        node: { style: { size: 16, labelText: (d) => d.id } },
        combo: { style: { labelText: (d) => d.id } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: 'getComboData()', run: () => ({ found: graph.getComboData().map((c) => String(c.id)), text: json(graph.getComboData()) }) },
      {
        label: "getComboData('alpha')",
        run: () => {
          const combo = graph.getComboData('alpha');
          return { found: [String(combo.id)], text: `children: ${json(combo.children)}` };
        },
      },
      {
        label: "getComboData(['beta', 'sub'])",
        run: () => {
          const found = graph.getComboData(['beta', 'sub']);
          return { found: found.map((c) => String(c.id)), text: json(found) };
        },
      },
    ]);
  });

export default mount;
