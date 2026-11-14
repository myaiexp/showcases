// title plugin with styled title and subtitle text, size and spacing
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const small = stage.preview;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: Array.from({ length: 12 }, (_, i) => ({ id: `node${i}` })) },
        node: { palette: 'spectral', style: { labelText: 'Ciallo', size: 18 } },
        layout: { type: 'circular' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        autoFit: 'view',
        padding: [small ? 56 : 76, 20, 20, 20],
        plugins: [
          {
            key: 'title',
            type: 'title',
            align: 'center',
            spacing: 4,
            size: small ? 52 : 60,
            title: 'This is a title',
            titleFontSize: small ? 20 : 28,
            titleFontFamily: 'sans-serif',
            titleFontWeight: 600,
            titleFill: '#ffffff',
            titleFillOpacity: 1,
            titleStroke: '#2989ff',
            titleLineWidth: 2,
            titleStrokeOpacity: 1,
            subtitle: 'This is a sub-title',
            subtitleFontSize: small ? 12 : 16,
            subtitleFontFamily: 'Arial',
            subtitleFontWeight: 300,
            subtitleFill: '#2989ff',
            subtitleFillOpacity: 1,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      slider(stage.bar, 'spacing', [0, 30, 1], 4, (spacing) => graph.updatePlugin({ key: 'title', spacing }));
      slider(stage.bar, 'titleFontSize', [14, 40, 1], 28, (titleFontSize) => graph.updatePlugin({ key: 'title', titleFontSize }));
    } else {
      stage.every(1300, (i) => graph.updatePlugin({ key: 'title', spacing: 2 + (i % 4) * 6 }));
    }
  });

export default mount;
