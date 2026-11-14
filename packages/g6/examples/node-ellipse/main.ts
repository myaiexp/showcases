// Ellipse node with live controls for its own style options
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
        data: { nodes: [{ id: 'node1', style: { size: [80, 40], fill: '#7e3feb' } }] },
        node: { type: 'ellipse' },
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
      let w = 80;
      let h = 40;
      slider(stage.bar, 'width', [10, 120, 1], w, (v) => void update({ size: [(w = v), h] }));
      slider(stage.bar, 'height', [10, 120, 1], h, (v) => void update({ size: [w, (h = v)] }));
    } else {
      const steps: NonNullable<NodeData['style']>[] = [{ size: [80, 40] }, { size: [40, 80] }, { size: [100, 30] }];
      stage.every(1400, (i) => update(steps[i % steps.length]!));
    }
  });

export default mount;
