// watermark plugin with a text watermark
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        // The watermark is a CSS background on the container, so the canvas must not cover it.
        background: 'transparent',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        autoFit: 'view',
        padding: 24,
        plugins: [
          {
            type: 'watermark',
            key: 'wm',
            text: 'G6: Graph Visualization',
            textFontSize: 14,
            textFill: '#ffffff',
            opacity: 0.18,
            rotate: Math.PI / 12,
          },
        ],
      }),
    );
    await graph.render();

    // No pointer in a card: sweep the rotation so the tiled text visibly turns.
    if (stage.preview) stage.every(900, (i) => graph.updatePlugin({ key: 'wm', rotate: (Math.PI / 12) * ((i % 6) - 2) }));
  });

export default mount;
