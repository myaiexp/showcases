// FAQ: set combo to null to remove a node from its combo
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
        data: {
          nodes: [
            { id: 'a', combo: 'box', style: { x: 80, y: 80 } },
            { id: 'b', combo: 'box', style: { x: 140, y: 100 } },
            { id: 'c', combo: 'box', style: { x: 110, y: 40 } },
          ],
          edges: [],
          combos: [{ id: 'box' }],
        },
        node: { style: { size: 20, labelText: (d) => String(d.id) } },
        combo: { style: { labelText: 'box' } },
      }),
    );
    await graph.render();

    const detach = () => {
      graph.updateNodeData([{ id: 'c', combo: null }]);
      return graph.draw();
    };
    const attach = () => {
      graph.updateNodeData([{ id: 'c', combo: 'box' }]);
      return graph.draw();
    };
    if (stage.bar) {
      button(stage.bar, "combo: null", () => void detach());
      button(stage.bar, "combo: 'box'", () => void attach());
    } else {
      stage.every(1500, (i) => (i % 2 ? detach() : attach()));
    }
  });

export default mount;
