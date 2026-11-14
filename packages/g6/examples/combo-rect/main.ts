// The rect combo: combo.type rect around a nested pair, with collapse-expand
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { nested } from '../../shared/combo-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: nested(),
        node: { style: { fill: '#7e3feb' } },
        combo: { type: 'rect' },
        behaviors: ['collapse-expand'],
        animation: true,
      }),
    );
    await graph.render();
    if (stage.preview) {
      stage.every(1400, async (i) => {
        if (i % 2) await graph.expandElement('combo1');
        else await graph.collapseElement('combo1');
      });
    }
  });

export default mount;
