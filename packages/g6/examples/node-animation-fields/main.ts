// Custom update animation: tween x and y only, with duration and easing
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const EASINGS = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(.3,.7,.3,1)'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const opts = { duration: 1000, easing: 'linear' as string };
    const build = () => ({
      style: { size: 30, fill: '#61DDAA', labelText: (d: NodeData) => d.id },
      // fields lists what is tweened; fill below changes at once because it is not listed.
      animation: { update: [{ fields: ['x', 'y'], duration: opts.duration, easing: opts.easing }] },
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: { nodes: [0, 1, 2].map((i) => ({ id: `n${i}`, style: { x: 40, y: 30 + i * 35 } })) },
        node: build(),
      }),
    );
    await graph.render();

    let right = false;
    const move = async (): Promise<void> => {
      right = !right;
      graph.updateNodeData(
        graph.getNodeData().map((n, i) => ({ id: n.id, style: { x: right ? 260 : 40, fill: right ? '#F6BD16' : '#61DDAA', y: 30 + i * 35 } })),
      );
      await graph.draw();
    };

    if (stage.bar) {
      slider(stage.bar, 'duration (ms)', [100, 3000, 100], 1000, (v) => ((opts.duration = v), graph.setNode(build())));
      select(stage.bar, 'easing', EASINGS, 'linear', (v) => ((opts.easing = v), graph.setNode(build())));
      const b = document.createElement('button');
      b.textContent = 'move';
      b.addEventListener('click', () => void move());
      stage.bar.append(b);
    } else {
      opts.duration = 900;
      graph.setNode(build());
      stage.every(1500, move);
    }
  });

export default mount;
