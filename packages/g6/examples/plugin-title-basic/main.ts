// title plugin: a main title and a subtitle over a circular graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: Array.from({ length: 12 }, (_, i) => ({ id: `node${i}` })) },
        node: { palette: 'spectral', style: { labelText: 'Ciallo', size: 18 } },
        layout: { type: 'circular' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        autoFit: 'view',
        // The title takes the top strip; keep nodes out of it.
        padding: [stage.preview ? 40 : 56, 20, 20, 20],
        plugins: [
          {
            key: 'title',
            type: 'title',
            title: 'This is a title',
            subtitle: 'This is a subtitle',
            titleFill: '#ffffff',
            subtitleFill: '#9fb3d1',
            size: stage.preview ? 36 : 44,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const texts = ['This is a title', 'Another title', 'Quarterly report'];
      stage.every(1500, (i) => graph.updatePlugin({ key: 'title', title: texts[i % texts.length] }));
    }
  });

export default mount;
