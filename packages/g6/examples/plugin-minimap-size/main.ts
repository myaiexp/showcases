// minimap size, padding and redraw delay
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('cluster');
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: stage.preview ? 7 : 14 }, palette: { field: 'cluster' } },
        edge: { style: { stroke: '#8b9baf88' } },
        layout: { type: 'circular', radius: stage.preview ? 60 : 150 },
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'center',
        plugins: [{ type: 'minimap', key: 'minimap', size: stage.preview ? [80, 55] : [240, 160], padding: 10, delay: 128, position: 'right-bottom' }],
      }),
    );
    await graph.render();

    const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'minimap', ...o });
    if (stage.bar) {
      slider(stage.bar, 'width', [100, 400, 10], 240, (w) => up({ size: [w, Math.round((w * 2) / 3)] }));
      slider(stage.bar, 'padding', [0, 50, 1], 10, (padding) => up({ padding }));
      slider(stage.bar, 'delay', [0, 500, 10], 128, (delay) => up({ delay }));
    } else {
      stage.every(1200, (i) => {
        const w = [80, 120, 150, 100][i % 4]!;
        up({ size: [w, Math.round((w * 2) / 3)], padding: (i % 3) * 8 });
      });
    }
  });

export default mount;
