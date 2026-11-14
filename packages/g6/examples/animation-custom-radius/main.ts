// Custom animation paradigm: fields ['r'] on the key shape tweens the radius on update
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node-1', style: { x: 150, y: 100, size: 20 } }] },
        node: {
          style: { fill: '#5B8FF9' },
          // size changes become a radius change of the circle shape named 'key'.
          animation: { update: [{ fields: ['r'], shape: 'key', duration: 900 }] },
        },
      }),
    );
    await graph.render();

    let big = false;
    const grow = async (): Promise<void> => {
      big = !big;
      graph.updateNodeData([{ id: 'node-1', style: { size: big ? 80 : 20 } }]);
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'update size', () => void grow());
    else stage.every(1400, grow);
  });

export default mount;
