// map-node-size transform: node size from a centrality type, switched with updateTransform
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubGraph } from '../../shared/transform-data.ts';

const TYPES = ['degree', 'betweenness', 'closeness', 'eigenvector', 'pagerank'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: hubGraph(),
        node: {
          style: {
            fill: '#5B8FF9',
            labelText: (d: NodeData) => (stage.preview ? '' : `${d.id}: ${Number((d.style?.size as number[] | undefined)?.[0] ?? 0).toFixed(0)}`),
          },
        },
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'circular', radius: 90 },
        // 5.1.1 reads centrality, minSize and maxSize (the doc page's field/min/max do nothing).
        transforms: [{ key: 'map-node-size', type: 'map-node-size', centrality: { type: 'pagerank' }, minSize: 12, maxSize: 54 }],
      }),
    );
    await graph.render();

    const setType = async (type: (typeof TYPES)[number]): Promise<void> => {
      graph.updateTransform({ key: 'map-node-size', centrality: { type } });
      await graph.render();
    };
    if (stage.bar) select(stage.bar, 'centrality.type', TYPES, 'pagerank', (v) => void setType(v));
    else stage.every(1500, (i) => setType(TYPES[i % TYPES.length]!));
  });

export default mount;
