// zIndex decides which overlapping node is drawn on top
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const COLORS = ['#5B8FF9', '#F6BD16', '#E86452'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: COLORS.map((fill, i) => ({ id: `n${i}`, style: { x: 60 + i * 40, y: 60, fill, zIndex: i } })),
        },
        node: { style: { size: 70, stroke: '#fff', lineWidth: 2, labelText: (d: NodeData) => `zIndex ${d.style?.zIndex}`, labelPlacement: 'center', labelFill: '#000' } },
      }),
    );
    await graph.render();

    const setZ = async (id: string, zIndex: number): Promise<void> => {
      graph.updateNodeData([{ id, style: { zIndex } }]);
      await graph.draw();
    };

    if (stage.bar) COLORS.forEach((_, i) => slider(stage.bar!, `n${i} zIndex`, [-5, 5, 1], i, (v) => void setZ(`n${i}`, v)));
    else stage.every(1200, (i) => setZ(`n${i % 3}`, 3 + i)); // each node in turn jumps to the top
  });

export default mount;
