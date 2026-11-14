// minimap on a zoomed-in graph, so the mask covers part of the thumbnail
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // cluster.json stands in for the docs' collection.json.
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
        plugins: [
          { type: 'minimap', key: 'minimap', size: stage.preview ? [100, 66] : [240, 160], position: 'right-bottom' },
        ],
      }),
    );
    await graph.render();
    await graph.zoomTo(stage.preview ? 1.6 : 1.8);

    if (stage.preview) {
      const steps: [number, number][] = [[-60, -20], [-60, 30], [60, 20], [60, -30]];
      stage.every(1100, (i) => graph.translateBy(steps[i % steps.length]!, { duration: 800 }));
    }
  });

export default mount;
