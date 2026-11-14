// Circular layout ordering: data order, topology or degree
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'circular', ordering: undefined };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('circular'),
        node: { style: { labelText: (d) => d.id, labelFill: '#fff', labelPlacement: 'center', labelFontSize: 9 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // 'data' is not an option value: it stands for the unset default, which keeps the array order.
    const rules = ['topology', 'topology-directed', 'degree', 'data'] as const;
    const apply = (rule: (typeof rules)[number]): Promise<void> =>
      relayout(graph, layout, { ordering: rule === 'data' ? undefined : rule });
    if (stage.bar) select(stage.bar, 'ordering', rules, 'data', apply);
    else stage.every(2200, (i) => apply(rules[i % rules.length]!));
  });

export default mount;
