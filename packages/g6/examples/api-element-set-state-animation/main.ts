// setElementState with the animation flag: the top row snaps, the bottom row eases into the state
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const row = (prefix: string, y: number) =>
      [0, 1, 2, 3].map((i) => ({ id: `${prefix}${i}`, style: { x: i * 70, y } }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: [...row('off', 0), ...row('on', 90)] },
        node: {
          style: {
            size: 28, fill: '#5B8FF9', lineWidth: 2, stroke: '#fff',
            labelText: (d: NodeData) => (String(d.id).startsWith('off') ? 'false' : 'true'),
            labelPlacement: 'bottom',
          },
          state: { selected: { fill: '#F6BD16', size: 48, lineWidth: 4 } },
        },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    let on = false;
    const flip = async (): Promise<void> => {
      on = !on;
      const s = on ? 'selected' : [];
      // One call per row, because the flag belongs to the call.
      await Promise.all([
        graph.setElementState({ off0: s, off1: s, off2: s, off3: s }, false),
        graph.setElementState({ on0: s, on1: s, on2: s, on3: s }, true),
      ]);
    };
    if (stage.bar) button(stage.bar, 'toggle selected on both rows', () => void flip());
    else stage.every(1800, flip);
  });

export default mount;
