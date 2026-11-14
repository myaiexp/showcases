// Snake sortBy: a comparator replaces the path order
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { chainGraph, toggleOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'snake', cols: 5, padding: 40 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: chainGraph(15),
        node: { style: { labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const byIdDescending = (a: NodeData, b: NodeData): number => Number(b.id) - Number(a.id);
    toggleOption(stage, graph, layout, 'sort by descending id', { sortBy: byIdDescending }, { sortBy: undefined }, false);
  });

export default mount;
