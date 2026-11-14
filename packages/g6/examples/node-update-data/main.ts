// updateNodeData changes only the listed style keys, then draw() applies them
import { Graph, type NodeData } from '@antv/g6';
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
        data: { nodes: [{ id: 'node-1', style: { x: 80, y: 60, fill: '#C6E5FF', size: 40, stroke: '#5B8FF9', lineWidth: 3 } }, { id: 'node-2', style: { x: 200, y: 60, fill: '#C6E5FF', size: 40, stroke: '#5B8FF9', lineWidth: 3 } }] },
        node: { style: { labelText: (d: NodeData) => `${d.id} size ${d.style?.size}` } },
      }),
    );
    await graph.render();

    // Only fill and size are sent; stroke and lineWidth stay as they were.
    const grow = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'node-1', style: { fill: 'red', size: 70 } }]);
      await graph.draw();
    };
    const reset = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'node-1', style: { fill: '#C6E5FF', size: 40 } }]);
      await graph.draw();
    };
    const select = (on: boolean): Promise<void> => graph.setElementState('node-2', on ? ['selected'] : []);

    if (stage.bar) {
      button(stage.bar, 'updateNodeData: red, size 70', () => void grow());
      button(stage.bar, 'updateNodeData: reset', () => void reset());
      button(stage.bar, 'setElementState: selected', () => void select(true));
      button(stage.bar, 'setElementState: clear', () => void select(false));
    } else {
      stage.every(1100, async (i) => {
        await (i % 2 ? reset() : grow());
        await select(i % 4 < 2);
      });
    }
  });

export default mount;
