// minimap mounted into a container outside the graph's own box
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('cluster');
    // A strip under the graph. A card keeps the minimap inside the graph box instead.
    let panel: HTMLDivElement | undefined;
    if (!stage.preview) {
      panel = document.createElement('div');
      panel.style.cssText = 'position:relative;height:180px;margin-top:8px;border:1px dashed #374151;border-radius:6px';
      el.append(panel);
      stage.onCleanup(() => panel?.remove());
    }
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
        plugins: [{ type: 'minimap', size: stage.preview ? [100, 66] : [240, 160], ...(panel ? { container: panel } : { position: 'right-bottom' }) }],
      }),
    );
    await graph.render();
    await graph.zoomTo(1.6);

    if (stage.preview) stage.every(1200, (i) => graph.translateBy([i % 2 ? 50 : -50, 0], { duration: 800 }));
  });

export default mount;
