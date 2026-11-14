// AnimationOptions timing keys on an update animation: duration, delay, easing, iterations, direction, fill
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const EASINGS = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(.5,-0.5,.5,1.5)'] as const;
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'] as const;
const FILLS = ['auto', 'none', 'forwards', 'backwards', 'both'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const t = {
      duration: 900,
      delay: 0,
      easing: 'ease-in-out' as string,
      iterations: 1,
      direction: 'normal' as string,
      fill: 'auto' as string,
    };
    const node = () => ({
      style: { size: 28, fill: '#F6BD16', labelText: (d: { id: string }) => d.id, labelPlacement: 'right' as const },
      // Every key besides fields and shape is passed to G's animate() as the effect timing.
      animation: { update: [{ fields: ['x', 'y'], ...t } as { fields: string[] }] },
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [0, 1].map((i) => ({ id: `n${i}`, style: { x: 40, y: 70 + i * 60 } })) },
        node: node(),
      }),
    );
    await graph.render();

    let right = false;
    const move = async (): Promise<void> => {
      right = !right;
      graph.setNode(node());
      graph.updateNodeData(graph.getNodeData().map((n, i) => ({ id: n.id, style: { x: right ? 230 : 40, y: 70 + i * 60 } })));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'duration', [100, 3000, 100], t.duration, (v) => (t.duration = v));
      slider(stage.bar, 'delay', [0, 1500, 100], t.delay, (v) => (t.delay = v));
      select(stage.bar, 'easing', EASINGS, 'ease-in-out', (v) => (t.easing = v));
      slider(stage.bar, 'iterations', [1, 4, 1], t.iterations, (v) => (t.iterations = v));
      select(stage.bar, 'direction', DIRECTIONS, 'normal', (v) => (t.direction = v));
      select(stage.bar, 'fill', FILLS, 'auto', (v) => (t.fill = v));
      button(stage.bar, 'move', () => void move());
    } else {
      t.easing = 'cubic-bezier(.5,-0.5,.5,1.5)';
      stage.every(1600, move);
    }
  });

export default mount;
