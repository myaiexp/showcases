// visibility: 'hidden' hides a node while it stays in the data
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const IDS = ['a', 'b', 'c', 'd'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: IDS.map((id, i) => ({ id, style: { x: 40 + i * 80, y: 60 } })),
          edges: [{ source: 'a', target: 'b' }, { source: 'b', target: 'c' }, { source: 'c', target: 'd' }],
        },
        node: { style: { size: 40, fill: '#5B8FF9', labelText: (d: NodeData) => d.id } },
      }),
    );
    await graph.render();

    const hidden = new Set<string>();
    const flip = async (id: string): Promise<void> => {
      if (!hidden.delete(id)) hidden.add(id);
      graph.updateNodeData([{ id, style: { visibility: hidden.has(id) ? 'hidden' : 'visible' } }]);
      await graph.draw();
    };

    if (stage.bar) for (const id of IDS) button(stage.bar, `toggle ${id}`, () => void flip(id));
    else stage.every(900, (i) => flip(IDS[i % IDS.length]!));
  });

export default mount;
