// grid-line with follow: true: the grid moves with the canvas when it is dragged
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: Array.from({ length: 10 }).map((_, i) => ({
            id: `node-${i}`,
            data: { category: i === 0 ? 'central' : 'around' },
          })),
          edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
        },
        node: {
          style: {
            size: 20,
          },
          palette: {
            field: 'category',
            color: 'tableau',
          },
        },
        edge: {
          style: {
            stroke: 'lightgreen',
          },
        },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        layout: {
          type: 'd3-force',
        },
        // The object form of a plugin carries its options.
        plugins: [{ type: 'grid-line', key: 'grid', follow: true }],
      }),
    );

    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'follow', true, (follow) => graph.updatePlugin({ key: 'grid', follow }));
    } else {
      // No pointer in a card: pan the canvas back and forth, and the grid pans with it.
      const steps: [number, number][] = [[40, 20], [-40, -20], [-40, 20], [40, -20]];
      stage.every(1200, (i) => graph.translateBy(steps[i % steps.length]!, { duration: 900 }));
    }
  });

export default mount;
