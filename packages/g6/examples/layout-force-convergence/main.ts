// force layout stopping rule with a monitor readout
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { clusterGraph, relayout } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    let last = { energy: 0, iterations: 0 };
    const layout: BaseLayoutOptions = { type: 'force', animation: false, preventOverlap: true, nodeSize: 14, minMovement: 0.4, distanceThresholdMode: 'mean', iterations: 500, monitor: (p: { energy: number; iterations: number }) => { last = p; } };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: clusterGraph(3, 8),
        node: {
          style: { size: 14 },
          palette: { type: 'group', field: (d) => String(d.data?.cluster) },
        },
        edge: { style: { stroke: '#667' } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    const show = (): void => {
      if (out) out.textContent = `last step: iteration ${last.iterations}, energy ${last.energy.toFixed(3)}`;
    };
    const run = async (patch: Record<string, unknown>): Promise<void> => {
      await relayout(graph, layout, patch);
      show();
    };
    if (stage.bar) {
      slider(stage.bar, 'minMovement', [0.01, 5, 0.01], 0.4, (minMovement) => run({ minMovement }));
      select(stage.bar, 'distanceThresholdMode', ['mean', 'max', 'min'] as const, 'mean', (distanceThresholdMode) => run({ distanceThresholdMode }));
    } else {
      const steps = [0.4, 4, 0.05];
      stage.every(2400, (i) => run({ minMovement: steps[i % steps.length] }));
    }
  });

export default mount;
