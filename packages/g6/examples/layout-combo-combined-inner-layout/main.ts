// combo-combined innerLayout: instances of the layout classes exported by @antv/g6
import { CircularLayout, ConcentricLayout, Graph, GridLayout } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // Each pick builds a new instance: a layout object carries state from its last run.
    const inner = {
      concentric: () => new ConcentricLayout({ sortBy: 'id', nodeSize: 20, clockwise: true }),
      grid: () => new GridLayout({ nodeSize: 20, preventOverlap: true }),
      circular: () => new CircularLayout({ nodeSize: 20 }),
    };
    const names = ['concentric', 'grid', 'circular'] as const;
    const layout: BaseLayoutOptions = { type: 'combo-combined', comboPadding: 8, innerLayout: inner.concentric() };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('combo'),
        node: {
          style: { size: 14 },
          palette: { type: 'group', field: (d) => d.combo as string },
        },
        edge: { style: { stroke: '#99ADD1' } },
        layout: { ...layout },
        behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    const apply = (name: (typeof names)[number]): Promise<void> => relayout(graph, layout, { innerLayout: inner[name]() });
    if (stage.bar) select(stage.bar, 'innerLayout', names, 'concentric', apply);
    else stage.every(2800, (i) => apply(names[i % names.length]!));
  });

export default mount;
