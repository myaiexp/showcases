// node.animation per stage: enter, update and exit, or false to turn off
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let next = 3;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: { nodes: [0, 1, 2].map((i) => ({ id: `n${i}`, style: { x: 50 + i * 80, y: 50 } })) },
        node: {
          style: { size: 36, fill: '#5B8FF9', labelText: (d: NodeData) => d.id },
          animation: { enter: 'fade', update: 'translate', exit: 'fade' },
        },
      }),
    );
    await graph.render();

    const add = async (): Promise<void> => {
      graph.addNodeData([{ id: `n${next}`, style: { x: 50 + (next % 4) * 80, y: 50 + (next % 3) * 40 } }]);
      next++;
      await graph.draw();
    };
    const remove = async (): Promise<void> => {
      const ids = graph.getNodeData().map((n) => n.id);
      if (ids.length > 1) graph.removeNodeData([ids[ids.length - 1]!]);
      await graph.draw();
    };
    const shuffle = async (): Promise<void> => {
      graph.updateNodeData(graph.getNodeData().map((n, k) => ({ id: n.id, style: { x: 50 + ((k + next++) % 4) * 80, y: 40 + ((k * 2 + next) % 3) * 40 } })));
      await graph.draw();
    };

    if (stage.bar) {
      const stages = ['enter', 'update', 'exit'] as const;
      const choices = ['default', 'false'] as const;
      const effects = { enter: 'fade', update: 'translate', exit: 'fade' };
      const anim: Record<string, string | false> = { ...effects };
      for (const s of stages)
        select(stage.bar, s, choices, 'default', (v) => {
          anim[s] = v === 'false' ? false : effects[s];
          graph.setNode({ style: { size: 36, fill: '#5B8FF9', labelText: (d: NodeData) => d.id }, animation: { ...anim } });
        });
      button(stage.bar, 'add node', () => void add());
      button(stage.bar, 'remove last', () => void remove());
      button(stage.bar, 'move nodes', () => void shuffle());
    } else {
      stage.every(1200, (i) => (i % 3 === 0 ? add() : i % 3 === 1 ? shuffle() : remove()));
    }
  });

export default mount;
