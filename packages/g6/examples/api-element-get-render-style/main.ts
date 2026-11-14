// getElementRenderStyle returns the style a node is drawn with, so a state's changes show up in it
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, steps, strip } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: strip(3, 90),
        node: {
          style: { size: 34, fill: '#5B8FF9', lineWidth: 2, stroke: '#9ec1ff', labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' },
          state: { selected: { fill: '#F6BD16', size: 50, lineWidth: 4 } },
        },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const pick = (id: string): string => {
      const { fill, size, lineWidth, stroke } = graph.getElementRenderStyle(id) as Record<string, unknown>;
      return fmt({ fill, size, lineWidth, stroke });
    };
    steps(stage, el, [
      { label: "getElementRenderStyle('n2')", run: () => pick('n2') },
      {
        label: "setElementState('n2', 'selected')",
        run: async () => (await graph.setElementState('n2', 'selected', false), pick('n2')),
      },
      {
        label: "setElementState('n2', [])",
        run: async () => (await graph.setElementState('n2', [], false), pick('n2')),
      },
    ]);
  });

export default mount;
