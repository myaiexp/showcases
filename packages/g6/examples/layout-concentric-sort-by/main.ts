// Concentric sortBy as 'degree' or a function over node data
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = clusterGraph(3, 7);
    // Nodes that end in 3 get the top rank, whatever their degree.
    for (const n of data.nodes ?? []) n.data = { ...n.data, rank: n.id.endsWith('3') ? 9 : Number(n.id.slice(1)) % 3 };
    const layout: BaseLayoutOptions = { type: 'concentric', nodeSize: 22, preventOverlap: true, sortBy: 'degree' };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data,
        node: {
          style: { size: 20, labelText: (d) => d.id, labelFill: '#fff', labelPlacement: 'center', labelFontSize: 8 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        layout: { ...layout },
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const sorters: Record<string, string | ((n: NodeData) => number)> = {
      degree: 'degree',
      rank: (n) => Number(n.data?.rank),
    };
    const names = ['degree', 'rank'] as const;
    const apply = (name: (typeof names)[number]): Promise<void> => relayout(graph, layout, { sortBy: sorters[name] });
    if (stage.bar) select(stage.bar, 'sortBy', names, 'degree', apply);
    else stage.every(2400, (i) => apply(names[i % names.length]!));
  });

export default mount;
