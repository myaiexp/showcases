// Triangle node with live controls for its own style options
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1', style: { size: 40, direction: 'up', fill: '#7e3feb' } }] },
        node: { type: 'triangle' },
        plugins: [{ type: 'grid-line', size: 30 }],
      }),
    );
    await graph.render();

    // updateNodeData merges: only the keys passed here change on node1.
    const update = async (style: NonNullable<NodeData['style']>): Promise<void> => {
      graph.updateNodeData([{ id: 'node1', style }]);
      await graph.draw();
    };

    if (stage.bar) {
      slider(stage.bar, 'size', [10, 100, 1], 40, (v) => void update({ size: v }));
      select(stage.bar, 'direction', ['up', 'left', 'right', 'down'] as const, 'up', (v) => void update({ direction: v }));
    } else {
      const steps: NonNullable<NodeData['style']>[] = [{ direction: 'up' }, { direction: 'right' }, { direction: 'down' }, { direction: 'left' }];
      stage.every(1400, (i) => update(steps[i % steps.length]!));
    }
  });

export default mount;
