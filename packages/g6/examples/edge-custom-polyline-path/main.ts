// A custom edge whose getKeyPath draws a three-segment step between two ports
import { BaseEdge, type BaseEdgeStyleProps, ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

class StepEdge extends BaseEdge {
  protected override getKeyPath(attributes: Required<BaseEdgeStyleProps>) {
    // getEndpoints returns the points on the node borders (or ports), not the centres.
    const [s, t] = this.getEndpoints(attributes);
    const midX = t[0] / 2 + s[0] / 2;
    return [['M', s[0], s[1]], ['L', midX, s[1]], ['L', midX, t[1]], ['L', t[0], t[1]]] as never;
  }
}

register(ExtensionCategory.EDGE, 'showcase-edge-step', StepEdge);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'node-0', style: { x: 40, y: 40, ports: [{ key: 'right', placement: [1, 0.5] }] } },
            { id: 'node-1', style: { x: 240, y: 140, ports: [{ key: 'left', placement: [0, 0.5] }] } },
          ],
          edges: [{ source: 'node-0', target: 'node-1' }],
        },
        edge: { type: 'showcase-edge-step', style: { startArrow: true, endArrow: true, stroke: '#F6BD16', lineWidth: 2 } },
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    if (stage.preview) stage.every(1100, (i) => graph.translateElementTo('node-1', [i % 2 ? 240 : 150, i % 2 ? 140 : 90], true));
  });

export default mount;
