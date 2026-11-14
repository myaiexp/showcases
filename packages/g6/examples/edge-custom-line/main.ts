// A custom edge built on BaseEdge: getKeyStyle and getKeyPath draw a plain line
import { BaseEdge, type BaseEdgeStyleProps, ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

class MyLineEdge extends BaseEdge {
  protected override getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    return { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#A4D3EE' };
  }

  // The one abstract method: return the SVG path from source centre to target centre.
  protected override getKeyPath(_attributes: Required<BaseEdgeStyleProps>) {
    const { sourceNode, targetNode } = this;
    const [x1, y1] = sourceNode.getPosition();
    const [x2, y2] = targetNode.getPosition();
    // PathArray lives in @antv/util, which is not importable from here.
    return [['M', x1, y1], ['L', x2, y2]] as never;
  }
}

register(ExtensionCategory.EDGE, 'showcase-edge-line', MyLineEdge);

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
            { id: 'node1', style: { x: 40, y: 50 } },
            { id: 'node2', style: { x: 240, y: 140 } },
          ],
          edges: [{ source: 'node1', target: 'node2' }],
        },
        node: { style: { fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2 } },
        edge: { type: 'showcase-edge-line', style: { zIndex: 3 } },
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    // The path follows the nodes, so moving one shows the edge being recomputed.
    if (stage.bar) slider(stage.bar, 'node2 y', [40, 160, 1], 140, (v) => void graph.translateElementTo('node2', [240, v], false));
    else stage.every(1000, (i) => graph.translateElementTo('node2', [240, i % 2 ? 140 : 40], true));
  });

export default mount;
