// updateTransform: change one transform's options, found by its key, without a full reset
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { parallelGraph } from '../../shared/transform-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: parallelGraph(),
        node: { style: { size: 22, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#F6BD16', lineWidth: 2 } },
        // updateTransform finds the transform by this key; without one it cannot.
        transforms: [{ type: 'process-parallel-edges', key: 'my-process-parallel-edges', distance: 20 }],
      }),
    );
    await graph.render();

    const update = async (patch: { distance?: number; mode?: 'bundle' | 'merge' }): Promise<void> => {
      graph.updateTransform({ key: 'my-process-parallel-edges', ...patch });
      await graph.render();
    };
    if (stage.bar) {
      slider(stage.bar, 'distance', [4, 60, 1], 20, (v) => void update({ distance: v }));
      select(stage.bar, 'mode', ['bundle', 'merge'] as const, 'bundle', (v) => void update({ mode: v }));
    } else {
      stage.every(1200, (i) => update({ distance: 8 + ((i * 12) % 40) }));
    }
  });

export default mount;
