// process-parallel-edges in bundle mode: parallel edges fan out by curvature, set by distance
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { parallelGraph } from '../../shared/transform-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: parallelGraph(),
        node: { style: { size: 22, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#F6BD16', lineWidth: 2 } },
        transforms: [{ key: 'parallel', type: 'process-parallel-edges', mode: 'bundle', distance: 20 }],
      }),
    );
    await graph.render();

    const setDistance = async (distance: number): Promise<void> => {
      graph.updateTransform({ key: 'parallel', distance });
      await graph.render();
    };
    // An odd group keeps its middle edge straight; the others are curved by distance.
    if (stage.bar) slider(stage.bar, 'distance', [4, 60, 1], 20, (v) => void setDistance(v));
    else stage.every(1200, (i) => setDistance(i % 2 ? 40 : 10));
  });

export default mount;
