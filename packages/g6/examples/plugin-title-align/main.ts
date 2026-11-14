// title plugin align: left, center or right
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const ALIGNS = ['left', 'center', 'right'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: Array.from({ length: 12 }, (_, i) => ({ id: `node${i}` })) },
        node: { palette: 'spectral', style: { labelText: 'Ciallo', size: 18 } },
        layout: { type: 'circular' },
        autoFit: 'view',
        padding: [stage.preview ? 40 : 56, 20, 20, 20],
        plugins: [
          {
            key: 'title',
            type: 'title',
            align: 'left',
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

    if (stage.bar) {
      select(stage.bar, 'align', ALIGNS, 'left', (align) => graph.updatePlugin({ key: 'title', align }));
    } else {
      stage.every(1200, (i) => graph.updatePlugin({ key: 'title', align: ALIGNS[i % ALIGNS.length] }));
    }
  });

export default mount;
