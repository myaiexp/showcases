// Built-in animations by stage: fade or translate for nodes, fade, path-in or path-out for edges
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type NodeAnim = 'fade' | 'translate';
type EdgeAnim = 'fade' | 'path-in' | 'path-out';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', style: { x: 0, y: 0 } },
            { id: 'b', style: { x: 120, y: -50 } },
            { id: 'c', style: { x: 120, y: 50 } },
            { id: 'd', style: { x: 240, y: 0 } },
          ],
          edges: [
            { id: 'ab', source: 'a', target: 'b' },
            { id: 'ac', source: 'a', target: 'c' },
            { id: 'bd', source: 'b', target: 'd' },
            { id: 'cd', source: 'c', target: 'd' },
          ],
        },
        node: {
          style: { size: 24, labelText: (d) => d.id },
          animation: { enter: 'fade', exit: 'fade', update: 'translate' },
        },
        edge: {
          style: { endArrow: true },
          animation: { enter: 'path-in', exit: 'path-out' },
        },
        autoFit: 'view',
        animation: { duration: 900 },
      }),
    );
    await graph.render();

    const set = (node: NodeAnim, edge: EdgeAnim): void => {
      graph.setOptions({
        node: { animation: { enter: node, exit: node } },
        edge: { animation: { enter: edge, exit: edge === 'path-in' ? 'path-out' : edge } },
      });
    };
    // Removing and re-adding d with its edges plays the exit and then the enter animation.
    const replay = async (): Promise<void> => {
      const d = graph.getNodeData('d');
      const edges = graph.getRelatedEdgesData('d');
      graph.removeNodeData(['d']);
      await graph.draw();
      graph.addData({ nodes: [d], edges });
      await graph.draw();
    };

    if (stage.bar) {
      let node: NodeAnim = 'fade';
      let edge: EdgeAnim = 'path-in';
      select(stage.bar, 'node enter/exit', ['fade', 'translate'] as const, node, (v) => ((node = v), set(node, edge)));
      select(stage.bar, 'edge enter/exit', ['path-in', 'fade', 'path-out'] as const, edge, (v) => ((edge = v), set(node, edge)));
      button(stage.bar, 'Remove and re-add d', () => void replay());
    } else {
      stage.every(2600, () => replay());
    }
  });

export default mount;
