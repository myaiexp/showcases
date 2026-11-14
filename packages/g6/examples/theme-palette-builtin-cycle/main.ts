// node.palette as a built-in name on 30 nodes: colours repeat once the palette runs out
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// spectral has 11 colours, tableau 10, the sequential ramps 9: the cycle length differs.
const NAMES = ['spectral', 'tableau', 'oranges', 'greens', 'blues'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 16,
        data: { nodes: Array.from({ length: 30 }, (_, i) => ({ id: `node-${i}` })) },
        layout: { type: 'grid', cols: 10, rows: 3 },
        node: { style: { size: 18 }, palette: 'spectral' },
      }),
    );
    await graph.render();

    const setPalette = async (palette: (typeof NAMES)[number]): Promise<void> => {
      graph.setNode({ style: { size: 18 }, palette });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'palette', NAMES, 'spectral', (v) => void setPalette(v));
    else stage.every(1300, (i) => setPalette(NAMES[i % NAMES.length]!));
  });

export default mount;
