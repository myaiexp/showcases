// dagre layout rankdir and align selects
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';

import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, selectOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'dagre', rankdir: 'TB', align: 'UL', ranksep: 40, nodesep: 20 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('dagre'),
        node: {
          style: { size: (d) => 16 + (Number(d.id) % 4) * 9, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 10 },
        },
        edge: { type: 'polyline', style: { endArrow: true } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      selectOption(stage, graph, layout, 'rankdir', ['TB', 'LR', 'BT', 'RL'] as const, 'TB');
      selectOption(stage, graph, layout, 'align', ['UL', 'UR', 'DL', 'DR'] as const, 'UL');
    } else {
      // The card walks through direction and alignment together.
      const combos = [['TB', 'UL'], ['TB', 'DR'], ['LR', 'UL'], ['LR', 'DR']] as const;
      stage.every(2000, (i) => {
        const [rankdir, align] = combos[i % combos.length]!;
        return relayout(graph, layout, { rankdir, align });
      });
    }
  });

export default mount;
