// All ten built-in node types from the extensions list, one node each
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { avatar } from '../../shared/images.ts';
import { mountGraph } from '../../shared/graph.ts';

const TYPES = ['circle', 'diamond', 'ellipse', 'hexagon', 'html', 'image', 'rect', 'star', 'donut', 'triangle'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: TYPES.map((type, i) => ({
            id: type,
            type,
            style: { x: (i % 5) * 80, y: Math.floor(i / 5) * 90 },
          })),
        },
        node: {
          style: {
            size: 40,
            labelText: (d) => d.id,
            labelPlacement: 'bottom',
          },
        },
        autoFit: 'view',
        padding: 24,
      }),
    );
    // html and image nodes need their own content style; the rest use the shared style above.
    graph.updateNodeData([
      { id: 'html', style: { innerHTML: '<div style="width:100%;height:100%;border-radius:8px;background:#7c4dff;color:#fff;font:12px sans-serif;display:flex;align-items:center;justify-content:center">html</div>' } },
      { id: 'image', style: { src: avatar(0) } },
      { id: 'donut', style: { donuts: [1, 2, 3] } },
    ]);
    await graph.render();

    if (stage.preview) stage.every(800, (i) => graph.setElementState({ [TYPES[(i + 9) % 10]!]: [], [TYPES[i % 10]!]: 'selected' }));
  });

export default mount;
