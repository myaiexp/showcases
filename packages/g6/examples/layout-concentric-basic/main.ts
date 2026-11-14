// The docs' 19-node concentric example, sorted by degree
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions, EdgeData, NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { toggleOption } from '../../shared/layout-data.ts';

// A hub, six spokes and twelve leaves, as in the docs.
const nodes: NodeData[] = [
  { id: 'center', data: { label: 'Center', level: 0 } },
  ...Array.from({ length: 6 }, (_, i) => ({ id: `level1-${i}`, data: { label: `L1-${i}`, level: 1 } })),
  ...Array.from({ length: 12 }, (_, i) => ({ id: `level2-${i}`, data: { label: `L2-${i}`, level: 2 } })),
];
const edges: EdgeData[] = [
  ...Array.from({ length: 6 }, (_, i) => ({ id: `e-c-${i}`, source: 'center', target: `level1-${i}` })),
  ...Array.from({ length: 12 }, (_, i) => ({ id: `e-l-${i}`, source: `level1-${Math.floor(i / 2)}`, target: `level2-${i}` })),
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'concentric', nodeSize: 32, sortBy: 'degree', preventOverlap: true };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes, edges },
        node: { style: { size: 28, labelText: (d) => String(d.data?.label), labelFill: '#fff', labelPlacement: 'center', labelFontSize: 8 } },
        layout: { ...layout },
        behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    toggleOption(stage, graph, layout, 'preventOverlap', { preventOverlap: true }, { preventOverlap: false }, true);
  });

export default mount;
