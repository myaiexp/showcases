// edge.animation per stage: enter, update and exit with built-in animation names
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const nodes = [
      { id: 'a', style: { x: 40, y: 30 } },
      { id: 'b', style: { x: 220, y: 30 } },
      { id: 'c', style: { x: 40, y: 130 } },
      { id: 'd', style: { x: 220, y: 130 } },
    ];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes, edges: [{ id: 'ab', source: 'a', target: 'b' }] },
        edge: {
          style: { lineWidth: 3, stroke: '#69B1FF', endArrow: true },
          animation: { enter: 'fade', update: 'path-in', exit: 'fade' },
        },
      }),
    );
    await graph.render();

    // Alternate between adding and removing the second edge so enter and exit both play.
    let present = false;
    const flip = async (): Promise<void> => {
      if (present) graph.removeEdgeData(['cd']);
      else graph.addEdgeData([{ id: 'cd', source: 'c', target: 'd' }]);
      present = !present;
      await graph.draw();
    };
    if (stage.bar) {
      const apply = async (enter: string, exit: string): Promise<void> => {
        graph.setEdge({
          style: { lineWidth: 3, stroke: '#69B1FF', endArrow: true },
          animation: { enter: enter === 'none' ? false : enter, update: 'path-in', exit: exit === 'none' ? false : exit },
        });
        await graph.draw();
      };
      let enter = 'fade';
      let exit = 'fade';
      select(stage.bar, 'enter', ['fade', 'path-in', 'none'], enter, (v) => ((enter = v), void apply(enter, exit)));
      select(stage.bar, 'exit', ['fade', 'path-out', 'none'], exit, (v) => ((exit = v), void apply(enter, exit)));
      button(stage.bar, 'add / remove edge c-d', () => void flip());
    } else {
      stage.every(1500, flip);
    }
  });

export default mount;
