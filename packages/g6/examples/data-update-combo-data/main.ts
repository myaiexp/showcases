// updateComboData() changes a combo's style or data; updateNodeData moves a node between combos
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
        combo: { style: { labelText: (d) => String(d.data?.title ?? d.id) } },
        autoFit: 'view',
        animation: { duration: 600 },
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: "updateComboData([{ id: 'beta', style: { fill, stroke } }])", run: () => graph.updateComboData([{ id: 'beta', style: { fill: '#ff9f43', fillOpacity: 0.3, stroke: '#ff9f43', lineWidth: 3 } }]) },
      { label: "updateComboData([{ id: 'alpha', data: { title } }])", run: () => graph.updateComboData([{ id: 'alpha', data: { title: 'alpha (renamed)' } }]) },
      { label: "updateNodeData([{ id: 'n6', combo: 'beta' }])", run: () => graph.updateNodeData([{ id: 'n6', combo: 'beta' }]) },
      { label: 'Reset', run: () => graph.setData(hierarchy('combo').data) },
    ]);
  });

export default mount;
