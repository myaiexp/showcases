// getElementRenderBounds returns the box of a node or a whole combo, drawn here as a dashed frame
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'group', style: { x: -70, y: -20 } },
            { id: 'b', combo: 'group', style: { x: -10, y: 30 } },
            { id: 'c', style: { x: 90, y: -10 } },
            // A rect node that only draws the answer: it is moved onto the returned AABB.
            { id: 'frame', type: 'rect', style: { x: 0, y: 0, size: [10, 10], visibility: 'hidden' } },
          ],
          edges: [{ source: 'b', target: 'c' }],
          combos: [{ id: 'group' }],
        },
        node: { style: { size: 30, labelText: (d: NodeData) => (d.id === 'frame' ? '' : d.id), labelPlacement: 'bottom' } },
        combo: { style: { labelText: (d: NodeData) => d.id, fillOpacity: 0.15 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const frame = async (id: string): Promise<string> => {
      // The docs describe { x, y, width, height }, but G's AABB class returns min and max corners.
      const { min, max } = graph.getElementRenderBounds(id);
      const [x = 0, y = 0] = min;
      const width = (max[0] ?? 0) - x;
      const height = (max[1] ?? 0) - y;
      graph.updateNodeData([
        {
          id: 'frame',
          style: {
            x: x + width / 2, y: y + height / 2, size: [width, height], visibility: 'visible',
            fill: 'none', stroke: '#F6BD16', lineDash: [5, 4], lineWidth: 1.5, pointerEvents: 'none',
          },
        },
      ]);
      await graph.draw();
      return fmt({ x, y, width, height });
    };

    steps(stage, el, [
      { label: "getElementRenderBounds('a')", run: () => frame('a') },
      { label: "getElementRenderBounds('c')", run: () => frame('c') },
      { label: "getElementRenderBounds('group')", run: () => frame('group') },
    ]);
  });

export default mount;
