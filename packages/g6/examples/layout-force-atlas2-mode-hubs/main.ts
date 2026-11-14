// force-atlas2 mode and hub dissuasion
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, selectOption } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'force-atlas2', preventOverlap: true, kr: 20, mode: 'normal', dissuadeHubs: false, nodeSize: 10 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: await dataset('relations'),
        node: {
          style: { size: 10 },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      selectOption(stage, graph, layout, 'mode', ['normal', 'linlog'] as const, 'normal');
      toggle(stage.bar, 'dissuadeHubs', false, (dissuadeHubs) => relayout(graph, layout, { dissuadeHubs }));
    } else {
      const steps = [{ mode: 'linlog' }, { mode: 'normal', dissuadeHubs: true }, { mode: 'normal', dissuadeHubs: false }];
      stage.every(3200, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
