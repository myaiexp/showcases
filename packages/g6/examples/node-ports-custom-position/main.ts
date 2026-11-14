// Ports placed by [x, y] ratios of the node box instead of a side name
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const ports = (x: number) => [
      { key: 'custom1', placement: [x, 0] as [number, number] },
      { key: 'custom2', placement: [1 - x, 0] as [number, number] },
      { key: 'custom3', placement: [1, 0.5] as [number, number] },
      { key: 'custom4', placement: [x, 1] as [number, number] },
    ];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'a', type: 'rect', style: { x: 70, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 230, y: 60 } },
          ],
        },
        node: { style: { size: [100, 50], fill: '#2a3550', stroke: '#5B8FF9', ports: ports(0.2), portR: 4, portLineWidth: 1, portStroke: '#fff', portFill: '#F4664A' } },
      }),
    );
    await graph.render();

    // placement [0.2, 0] is 20% along the top edge; [1, 0.5] is the right edge's middle.
    const setX = async (x: number): Promise<void> => {
      graph.updateNodeData(['a', 'b'].map((id) => ({ id, style: { ports: ports(x) } })));
      await graph.draw();
    };

    if (stage.bar) slider(stage.bar, 'x ratio of custom1 / custom2', [0, 0.5, 0.05], 0.2, (v) => void setX(v));
    else stage.every(900, (i) => setX([0.2, 0.4, 0.05, 0.3][i % 4]!));
  });

export default mount;
