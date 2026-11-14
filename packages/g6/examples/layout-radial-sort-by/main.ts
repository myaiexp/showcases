// Radial sorting within a ring: data order or by id
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, sliderOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'radial', nodeSize: 32, unitRadius: 80, linkDistance: 120, sortBy: 'data', sortStrength: 10 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('radial'),
        node: { style: { size: 24, labelFill: '#fff', labelPlacement: 'center', labelText: (d) => d.id, labelFontSize: 9 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // A function sorts by the numeric id; 'data' keeps the order of the data array.
    const byId = (n: NodeData): number => Number(n.id);
    const options = { data: 'data', id: byId } as const;
    const names = ['data', 'id'] as const;
    if (stage.bar) {
      select(stage.bar, 'sortBy', names, 'data', (name) => relayout(graph, layout, { sortBy: options[name] }));
      sliderOption(stage, graph, layout, 'sortStrength', [1, 100, 1], 10, []);
    } else {
      const steps = [['data', 10], ['id', 10], ['id', 80]] as const;
      stage.every(2400, (i) => {
        const [name, sortStrength] = steps[i % steps.length]!;
        return relayout(graph, layout, { sortBy: options[name], sortStrength });
      });
    }
  });

export default mount;
