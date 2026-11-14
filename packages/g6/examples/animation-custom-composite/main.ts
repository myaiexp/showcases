// Composite animation paradigm: x, y on the element plus r on the key shape
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
        data: { nodes: [{ id: 'node-1', style: { x: 40, y: 100, size: 20 } }] },
        node: {
          style: { fill: '#61DDAA' },
          animation: {
            update: [
              // No shape: the animation runs on the whole element (its x and y).
              { fields: ['x', 'y'], duration: 1000 },
              { fields: ['r'], shape: 'key', duration: 1000 },
            ],
          },
        },
      }),
    );
    await graph.render();

    let moved = false;
    const go = async (): Promise<void> => {
      moved = !moved;
      graph.updateNodeData([{ id: 'node-1', style: { x: moved ? 260 : 40, size: moved ? 70 : 20 } }]);
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'update x and size', () => void go());
    else stage.every(1500, go);
  });

export default mount;
