// toolbar plugin with three built-in icons wired to zoom and fit
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
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        autoFit: 'view',
        padding: [44, 24, 24, 24],
        plugins: [
          {
            type: 'toolbar',
            key: 'toolbar',
            position: 'top-left',
            getItems: () => [
              { id: 'zoom-in', value: 'zoom-in' },
              { id: 'zoom-out', value: 'zoom-out' },
              { id: 'auto-fit', value: 'auto-fit' },
            ],
            onClick: (value: string) => {
              if (value === 'zoom-in') graph.zoomBy(1.1);
              else if (value === 'zoom-out') graph.zoomBy(0.9);
              else if (value === 'auto-fit') graph.fitView();
            },
          },
        ],
      }),
    );
    await graph.render();

    // Cards have no pointer: do what the three buttons do, in turn.
    if (stage.preview) {
      const steps = [() => graph.zoomBy(1.3, { duration: 500 }), () => graph.zoomBy(0.6, { duration: 500 }), () => graph.fitView(undefined, { duration: 500 })];
      stage.every(1200, (i) => steps[i % steps.length]!());
    }
  });

export default mount;
