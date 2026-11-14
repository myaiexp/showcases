// Grid sortBy: 'degree', 'id' or a comparator on data.value
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, valueGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'grid', cols: 6, rows: 4, sortBy: 'degree' };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: valueGraph(24, 18),
        node: {
          style: { size: 22, labelText: (d) => String(d.data?.value), labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 },
          palette: { type: 'group', field: (d) => String(Math.floor(Number(d.data?.value) / 34)) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    const sorters: Record<string, string | ((a: NodeData, b: NodeData) => number)> = {
      degree: 'degree',
      id: 'id',
      // Labels show data.value: the grid reads in descending order of the number on each node.
      value: (a, b) => Number(b.data?.value) - Number(a.data?.value),
    };
    const names = ['degree', 'id', 'value'] as const;
    const apply = (name: (typeof names)[number]): Promise<void> => relayout(graph, layout, { sortBy: sorters[name] });
    if (stage.bar) select(stage.bar, 'sortBy', names, 'degree', apply);
    else stage.every(2200, (i) => apply(names[i % names.length]!));
  });

export default mount;
