// Rect combos as a service-layer diagram: a layer holding two groups of services
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const at = (x: number, y: number, labelText: string) => ({ x, y, labelText });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            // The docs label these in Chinese: microservices 1-4, third-party login, task scheduling, messaging.
            { id: 'node1', combo: 'combo2', style: at(100, 100, 'Service 1') },
            { id: 'node2', combo: 'combo2', style: at(200, 100, 'Service 2') },
            { id: 'node3', combo: 'combo2', style: at(100, 200, 'Service 3') },
            { id: 'node4', combo: 'combo2', style: at(200, 200, 'Service 4') },
            { id: 'node5', combo: 'combo3', style: at(300, 100, 'Third-party login') },
            { id: 'node6', combo: 'combo3', style: at(300, 150, 'Task scheduling') },
            { id: 'node7', combo: 'combo3', style: at(300, 200, 'Messaging') },
          ],
          edges: [
            { source: 'node1', target: 'node2' },
            { source: 'node1', target: 'node3' },
            { source: 'node3', target: 'node4' },
          ],
          combos: [
            { id: 'combo1', style: { labelText: 'Service layer' } },
            { id: 'combo2', combo: 'combo1', style: { labelText: 'Business services' } },
            { id: 'combo3', combo: 'combo1', style: { labelText: 'Integration modules' } },
          ],
        },
        node: { type: 'rect' },
        edge: { style: { endArrow: true } },
        combo: { type: 'rect', style: { padding: 16 } },
        behaviors: ['drag-element', 'collapse-expand'],
        animation: true,
      }),
    );
    await graph.render();
    if (stage.preview) {
      stage.every(1500, async (i) => {
        const id = ['combo2', 'combo3'][(i >> 1) % 2]!;
        if (i % 2) await graph.expandElement(id);
        else await graph.collapseElement(id);
      });
    }
  });

export default mount;
