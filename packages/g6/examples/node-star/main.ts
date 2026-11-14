// Star node with live controls for its own style options
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1', style: { size: 40, innerR: 8, fill: '#7e3feb' } }] },
        node: { type: 'star' },
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
      slider(stage.bar, 'innerR', [0, 50, 1], 8, (v) => void update({ innerR: v }));
    } else {
      const steps: NonNullable<NodeData['style']>[] = [{ size: 60, innerR: 8 }, { size: 60, innerR: 20 }, { size: 60, innerR: 2 }];
      stage.every(1400, (i) => update(steps[i % steps.length]!));
    }
  });

export default mount;
