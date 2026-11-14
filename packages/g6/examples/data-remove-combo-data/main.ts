// removeComboData() removes a combo by id; its member nodes stay in the graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, hierarchy } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hierarchy('combo').data,
        node: { style: { size: 18, labelText: (d) => d.id } },
        combo: { style: { labelText: (d) => d.id } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: "removeComboData(['beta'])", run: () => graph.removeComboData(['beta']) },
      { label: "removeComboData(combos => ['sub'])", run: () => graph.removeComboData((combos) => combos.filter((c) => c.id === 'sub').map((c) => String(c.id))) },
      { label: 'Reset', run: () => graph.setData(hierarchy('combo').data) },
    ]);
  });

export default mount;
