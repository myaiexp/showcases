// animation: true, false or a timing object sets the base for every element animation
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

type Mode = 'off' | 'on' | 'slow, ease-in-out';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(8, 'n', 70),
        node: { style: { size: 22 } },
        autoFit: 'center',
        animation: true,
      }),
    );
    await graph.render();

    const modes: Record<Mode, boolean | { duration: number; easing: string }> = {
      off: false,
      on: true,
      'slow, ease-in-out': { duration: 1500, easing: 'ease-in-out' },
    };
    let flip = 0;
    // Moving nodes through updateNodeData + draw() is animated by the update animation.
    const shuffle = async (): Promise<void> => {
      flip += 1;
      const r = flip % 2 ? 40 : 100;
      graph.updateNodeData(
        graph.getNodeData().map((n, i, all) => {
          const a = (i / all.length) * Math.PI * 2;
          return { id: n.id, style: { x: Math.cos(a) * r, y: Math.sin(a) * r } };
        }),
      );
      await graph.draw();
    };

    if (stage.bar) {
      select(stage.bar, 'animation', Object.keys(modes) as Mode[], 'on', (v) => graph.setOptions({ animation: modes[v] }));
      button(stage.bar, 'Move nodes', () => void shuffle());
    } else {
      stage.every(1800, () => shuffle());
    }
  });

export default mount;
