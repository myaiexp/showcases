// combo-combined outerLayout: a ForceLayout instance with different repulsion
import { ForceLayout, Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const outer = {
      compact: () => new ForceLayout({ gravity: 4, factor: 1, linkDistance: 40 }),
      loose: () => new ForceLayout({ gravity: 0.5, factor: 6, linkDistance: 120 }),
    };
    const names = ['compact', 'loose'] as const;
    const layout: BaseLayoutOptions = { type: 'combo-combined', comboPadding: 8, outerLayout: outer.compact() };
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

    const apply = (name: (typeof names)[number]): Promise<void> => relayout(graph, layout, { outerLayout: outer[name]() });
    if (stage.bar) select(stage.bar, 'outerLayout', names, 'compact', apply);
    else stage.every(3000, (i) => apply(names[(i) % names.length]!));
  });

export default mount;
