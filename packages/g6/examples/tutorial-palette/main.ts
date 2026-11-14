// node.palette colours nodes by a data field: one central node, nine around it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// The built-in palettes the Built-in Extensions page lists.
const PALETTES = ['tableau', 'spectral', 'oranges', 'greens', 'blues'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: Array.from({ length: 10 }).map((_, i) => ({
            id: `node-${i}`,
            data: { category: i === 0 ? 'central' : 'around' },
          })),
          edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
        },
        node: {
          // No fill here: a fill style outranks the colour the palette assigns.
          style: {
            size: 20,
          },
          palette: {
            field: 'category',
            color: 'tableau',
          },
        },
        edge: {
          style: {
            stroke: 'lightgreen',
          },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        layout: {
          type: 'd3-force',
        },
      }),
    );

    await graph.render();

    const usePalette = async (color: (typeof PALETTES)[number]): Promise<void> => {
      graph.setOptions({ node: { style: { size: 20 }, palette: { field: 'category', color } } });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'palette', PALETTES, 'tableau', (v) => void usePalette(v));
    else stage.every(1800, (i) => usePalette(PALETTES[i % PALETTES.length]!));
  });

export default mount;
