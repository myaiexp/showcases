// FAQ: long node labels wrapped and truncated with labelWordWrap and labelWordWrapWidth
import { Graph } from '@antv/g6';
import type { NodeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// setNode replaces the whole node option, so every call passes the full object.
const nodeOptions = (labelWordWrap: boolean, labelWordWrapWidth: number): NodeOptions => ({
  style: {
    size: 28,
    labelText: 'This is a long text',
    labelPlacement: 'bottom',
    labelWordWrap,
    labelWordWrapWidth,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', style: { x: 70, y: 90 } },
            { id: 'b', style: { x: 190, y: 90 } },
          ],
          edges: [],
        },
        node: nodeOptions(true, 50),
      }),
    );
    await graph.render();

    if (stage.bar) {
      let wrap = true;
      let width = 50;
      const apply = () => {
        graph.setNode(nodeOptions(wrap, width));
        void graph.draw();
      };
      toggle(stage.bar, 'labelWordWrap', wrap, (v) => ((wrap = v), apply()));
      slider(stage.bar, 'labelWordWrapWidth', [20, 200, 5], width, (v) => ((width = v), apply()));
    } else {
      const widths = [50, 30, 90, 50];
      stage.every(1200, (i) => {
        graph.setNode(nodeOptions(true, widths[i % widths.length]!));
        return graph.draw();
      });
    }
  });

export default mount;
