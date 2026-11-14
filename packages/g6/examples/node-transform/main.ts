// transform and transformOrigin rotate and scale the node shapes
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const state = { rotate: 0, scale: 1, origin: 'center' };
    // transform is set on the node's group as given, replacing the translate G6 places the
    // node with, so it must put the node's own x and y back. The string form the docs type
    // ('rotate(45deg)') lost every node's position in 5.1.1; G's array form keeps it, and
    // its steps apply last-to-first: translate to the node, then scale, then rotate.
    const transform = (d: NodeData) =>
      [
        ['rotate', state.rotate],
        ['scale', state.scale, state.scale],
        ['translate', d.style?.x ?? 0, d.style?.y ?? 0],
      ] as unknown as string; // NodeStyle types transform as string only
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'a', type: 'rect', style: { x: 60, y: 60 } },
            { id: 'b', type: 'star', style: { x: 160, y: 60 } },
            { id: 'c', type: 'triangle', style: { x: 260, y: 60 } },
          ],
        },
        node: { style: { size: 44, fill: '#F6BD16', labelText: (d) => d.id } },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.setNode({
        style: { size: 44, fill: '#F6BD16', labelText: (d) => d.id, transform, transformOrigin: state.origin },
      });
      await graph.draw();
    };

    if (stage.bar) {
      slider(stage.bar, 'rotate (deg)', [0, 360, 5], 0, (v) => ((state.rotate = v), void apply()));
      slider(stage.bar, 'scale', [0.5, 2, 0.1], 1, (v) => ((state.scale = v), void apply()));
      select(stage.bar, 'transformOrigin', ['center', 'left top', 'right bottom'] as const, 'center', (v) => ((state.origin = v), void apply()));
    } else {
      stage.every(900, (i) => {
        state.rotate = (i * 45) % 360;
        state.scale = [1, 1.4, 0.8][i % 3]!;
        return apply();
      });
    }
  });

export default mount;
