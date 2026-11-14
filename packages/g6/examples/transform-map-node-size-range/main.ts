// map-node-size transform: minSize and maxSize bound the mapped node sizes
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { smallTree } from '../../shared/transform-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { min: 20, max: 60 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: smallTree(),
        node: { style: { fill: '#F6BD16', labelText: (d) => d.id } },
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'antv-dagre', rankdir: 'LR', nodesep: 20, ranksep: 70 },
        transforms: [{ key: 'map-node-size', type: 'map-node-size', centrality: { type: 'degree' }, minSize: v.min, maxSize: v.max }],
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateTransform({ key: 'map-node-size', minSize: v.min, maxSize: v.max });
      await graph.render();
    };
    if (stage.bar) {
      slider(stage.bar, 'minSize', [4, 60, 1], v.min, (x) => ((v.min = Math.min(x, v.max)), void apply()));
      slider(stage.bar, 'maxSize', [20, 100, 1], v.max, (x) => ((v.max = Math.max(x, v.min)), void apply()));
    } else {
      stage.every(1400, (i) => {
        v.min = i % 2 ? 8 : 24;
        v.max = i % 2 ? 36 : 62;
        return apply();
      });
    }
  });

export default mount;
