// edge.palette set to a registered palette name, colours assigned by edge id
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const NAMES = ['tableau', 'spectral', 'oranges'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [1, 2, 3, 4, 5, 6].map((n) => ({ id: `node-${n}` })),
          edges: [2, 3, 4, 5, 6].map((n) => ({ source: 'node-1', target: `node-${n}` })),
        },
        node: { style: { size: 14 } },
        layout: { type: 'radial', unitRadius: 80, linkDistance: 80 },
        edge: { style: { endArrow: true, lineWidth: 2 }, palette: 'tableau' },
      }),
    );
    await graph.render();
    const set = async (name: string): Promise<void> => {
      graph.setEdge({ style: { endArrow: true, lineWidth: 2 }, palette: name });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'palette', NAMES, 'tableau', (v) => void set(v));
    else stage.every(1500, (i) => set(NAMES[i % NAMES.length]!));
  });

export default mount;
