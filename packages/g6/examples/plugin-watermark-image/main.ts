// watermark plugin with imageURL, which wins over text
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { glyph } from '../../shared/images.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
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
            // A data URL, never a remote logo.
            imageURL: glyph(4),
            width: 100,
            height: 60,
            opacity: 0.25,
            rotate: Math.PI / 12,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      slider(stage.bar, 'width', [40, 240, 10], 100, (width) => graph.updatePlugin({ key: 'wm', width }));
      slider(stage.bar, 'height', [30, 160, 10], 60, (height) => graph.updatePlugin({ key: 'wm', height }));
    } else {
      stage.every(1000, (i) => graph.updatePlugin({ key: 'wm', width: 70 + (i % 4) * 30, height: 50 + (i % 4) * 15 }));
    }
  });

export default mount;
