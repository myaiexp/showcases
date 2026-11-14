// addComboData() adds a combo; nodes join it through their own combo field
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(6, 'n', 90),
        node: { style: { size: 22, labelText: (d) => d.id } },
        combo: { style: { labelText: (d) => d.id } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    // In 5.1.1 a combo wraps the nodes whose own `combo` field names it; `children` on the
    // combo's data alone does not move nodes in, so a node update joins them.
    const addWith = (id: string, members: string[]) => async () => {
      if (graph.hasCombo(id)) return;
      graph.addComboData([{ id }]);
      graph.updateNodeData(members.map((member) => ({ id: member, combo: id })));
      // The combo is larger than its nodes, so the view is fitted again.
      await graph.draw();
      await graph.fitView({}, { duration: 300 });
    };
    callList(stage, graph, el, [
      { label: "addComboData([{ id: 'empty' }])", run: () => (graph.hasCombo('empty') ? undefined : graph.addComboData([{ id: 'empty' }])) },
      { label: "addComboData + updateNodeData: combo1 holds n0, n1", run: addWith('combo1', ['n0', 'n1']) },
      { label: "addComboData + updateNodeData: combo2 holds n3, n4", run: addWith('combo2', ['n3', 'n4']) },
      { label: 'Reset', run: () => graph.setData(ring(6, 'n', 90)) },
    ]);
  });

export default mount;
