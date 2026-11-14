// The key shape sets the node bounds: edges end on the circle or on the rect
import { Circle, ExtensionCategory, Graph, Rect, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Which = 'circle' | 'rect';
type Attrs = Required<BaseNodeStyleProps>;
type Container = NonNullable<Parameters<Circle['render']>[1]>;

const RECT = { x: -60, y: -25, width: 120, height: 50, fill: 'none', stroke: '#8c8c8c', lineWidth: 2, lineDash: [4, 4] };
const CIRCLE = { cx: 0, cy: 0, r: 45, fill: 'none', stroke: '#8c8c8c', lineWidth: 2, lineDash: [4, 4] };

// Each class extends a built-in node, so its key shape is the circle or the rect it draws,
// and an extra dashed shape of the other kind sits on top of it.
class CircleKeyNode extends Circle {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    this.upsert('hint', 'rect', RECT, container);
  }
}
class RectKeyNode extends Rect {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    this.upsert('hint', 'circle', CIRCLE, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-key-circle', CircleKeyNode);
register(ExtensionCategory.NODE, 'showcase-shape-key-rect', RectKeyNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'a', style: { x: 60, y: 100 } },
            { id: 'b', style: { x: 240, y: 100 } },
            { id: 'c', style: { x: 150, y: 20 } },
          ],
          edges: [
            { source: 'a', target: 'b' },
            { source: 'a', target: 'c' },
            { source: 'c', target: 'b' },
          ],
        },
        node: { type: 'showcase-shape-key-circle', style: { size: 90, fill: '#1d3a5f', stroke: '#5B8FF9', lineWidth: 2 } },
        edge: { style: { stroke: '#F6BD16', lineWidth: 2, endArrow: true } },
      }),
    );
    await graph.render();

    // Switching node.type makes G6 rebuild each node with the other class.
    const setKey = async (which: Which): Promise<void> => {
      graph.setNode({ type: `showcase-shape-key-${which}`, style: { size: which === 'rect' ? ([120, 50] as [number, number]) : 90, fill: '#1d3a5f', stroke: '#5B8FF9', lineWidth: 2 } });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'key shape', ['circle', 'rect'] as const, 'circle', (v) => void setKey(v));
    else stage.every(1800, (i) => setKey(i % 2 ? 'rect' : 'circle'));
  });

export default mount;
