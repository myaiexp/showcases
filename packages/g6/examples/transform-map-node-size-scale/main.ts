// map-node-size transform: the scale option (log, linear, pow, sqrt or a function)
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubGraph } from '../../shared/transform-data.ts';

const SCALES = ['log', 'linear', 'pow', 'sqrt', 'custom (steps)'] as const;
type Scale = (typeof SCALES)[number];

// A custom scale gets the centrality, its [min, max] domain and the [minSize, maxSize] range.
const steps = (value: number, domain: [number, number], range: [number, number]): number => {
  const t = (value - domain[0]) / (domain[1] - domain[0] || 1);
  return range[0] + Math.round(t * 3) * ((range[1] - range[0]) / 3);
};

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
            fill: '#61DDAA',
            labelText: (d: NodeData) => (stage.preview ? '' : `${Number((d.style?.size as number[] | undefined)?.[0] ?? 0).toFixed(0)}`),
          },
        },
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'force', preventOverlap: true, nodeSize: 60 },
        transforms: [{ key: 'map-node-size', type: 'map-node-size', centrality: { type: 'degree' }, scale: 'log', minSize: 10, maxSize: 56 }],
      }),
    );
    await graph.render();

    const setScale = async (scale: Scale): Promise<void> => {
      graph.updateTransform({ key: 'map-node-size', scale: scale === 'custom (steps)' ? steps : scale });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'scale', SCALES, 'log', (v) => void setScale(v));
    else stage.every(1500, (i) => setScale(SCALES[i % SCALES.length]!));
  });

export default mount;
