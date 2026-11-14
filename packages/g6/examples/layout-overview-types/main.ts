// The Layout Overview's list of types applied to one graph through setLayout + layout()
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ringGraph } from '../../shared/layout-data.ts';

const TYPES = ['circular', 'grid', 'concentric', 'radial', 'mds', 'fruchterman', 'dagre', 'random'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: ringGraph(20, 8),
        node: { style: { size: 18, labelText: (d) => d.id, labelFill: '#fff', labelPlacement: 'center', labelFontSize: 8 } },
        layout: { type: 'circular' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const apply = async (type: string): Promise<void> => {
      graph.setLayout({ type });
      await graph.layout();
      await graph.fitView();
    };

    if (stage.bar) {
      select(stage.bar, 'type', TYPES, 'circular', (t) => apply(t));
    } else {
      stage.every(2200, (i) => apply(TYPES[i % TYPES.length]!));
    }
  });

export default mount;
