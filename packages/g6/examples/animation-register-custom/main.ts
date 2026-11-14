// Register animation paradigms with ExtensionCategory.ANIMATION and name them in node.animation
import { ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// A paradigm is just the array of { fields, shape?, ...timing } from the animation docs.
register(ExtensionCategory.ANIMATION, 'showcase-animation-grow', [
  { fields: ['x', 'y'], duration: 700 },
  { fields: ['r', 'fill'], shape: 'key', duration: 700, easing: 'ease-out' },
]);
register(ExtensionCategory.ANIMATION, 'showcase-animation-drift', [{ fields: ['x', 'y'], duration: 1400, easing: 'cubic-bezier(.5,-0.5,.5,1.5)' }]);

const NAMES = ['showcase-animation-grow', 'showcase-animation-drift', 'translate'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let name: string = NAMES[0];
    const node = () => ({ style: { fill: '#9270CA' }, animation: { update: name } });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 40, y: 100, size: 24 } }] },
        node: node(),
      }),
    );
    await graph.render();

    let moved = false;
    const go = async (): Promise<void> => {
      moved = !moved;
      graph.setNode(node());
      graph.updateNodeData([{ id: 'a', style: { x: moved ? 250 : 40, size: moved ? 60 : 24, fill: moved ? '#F08BB4' : '#9270CA' } }]);
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'node.animation.update', NAMES, NAMES[0], (v) => (name = v));
      button(stage.bar, 'update node', () => void go());
    } else {
      stage.every(1600, (i) => {
        name = NAMES[i % NAMES.length]!;
        return go();
      });
    }
  });

export default mount;
