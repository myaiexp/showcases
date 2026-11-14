// A custom edge reads attributes.states in getKeyStyle to restyle itself when selected
import { BaseEdge, type BaseEdgeStyleProps, ExtensionCategory, Graph, register, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

class GlowEdge extends BaseEdge {
  protected override getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    const style = { ...super.getKeyStyle(attributes), lineWidth: 2, stroke: '#8c8c8c' };
    // The state list arrives in attributes, so the class can branch on it directly.
    if ((attributes as { states?: string[] }).states?.includes('selected')) {
      return { ...style, stroke: '#1890ff', lineWidth: 3, shadowColor: 'rgba(24,144,255,0.8)', shadowBlur: 15 };
    }
    return style;
  }

  protected override getKeyPath(attributes: Required<BaseEdgeStyleProps>) {
    const [s, t] = this.getEndpoints(attributes);
    return [['M', s[0], s[1]], ['L', t[0], t[1]]] as never;
  }
}

register(ExtensionCategory.EDGE, 'showcase-edge-glow', GlowEdge);

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
            { id: 'a', style: { x: 40, y: 40 } },
            { id: 'b', style: { x: 240, y: 40 } },
            { id: 'c', style: { x: 40, y: 140 } },
            { id: 'd', style: { x: 240, y: 140 } },
          ],
          edges: [
            { id: 'ab', source: 'a', target: 'b' },
            { id: 'cd', source: 'c', target: 'd' },
          ],
        },
        edge: { type: 'showcase-edge-glow', style: { cursor: 'pointer' } },
      }),
    );
    await graph.render();
    if (stage.bar) {
      graph.on('edge:click', (e: IElementEvent) => {
        const sel = graph.getElementState(e.target.id).includes('selected');
        void graph.setElementState(e.target.id, sel ? [] : ['selected']);
      });
    } else {
      stage.every(1000, (i) => graph.setElementState({ ab: i % 2 ? [] : ['selected'], cd: i % 2 ? ['selected'] : [] }));
    }
  });

export default mount;
