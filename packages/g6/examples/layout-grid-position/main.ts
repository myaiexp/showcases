// Grid position: pin some nodes to explicit cells
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption, valueGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'grid', cols: 5, rows: 4, position: undefined };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: valueGraph(20, 0),
        node: {
          style: { size: 22, labelText: (d) => String(d.data?.value), labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 },
          palette: { type: 'group', field: (d) => String(Number(d.data?.value) > 60), color: ['#1783FF', '#F08F56'] },
        },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    // Nodes above 60 take the first row, left to right by their position in the data.
    const hot = (graph.getNodeData() as NodeData[]).filter((n) => Number(n.data?.value) > 60).map((n) => n.id);
    const pinned = { position: (n: NodeData) => (hot.includes(n.id) ? { row: 0, col: hot.indexOf(n.id) } : {}) };
    toggleOption(stage, graph, layout, 'pin high values to row 0', pinned, { position: () => ({}) }, false);
  });

export default mount;
