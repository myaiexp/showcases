// Atomic rect shape (x, y, width, height, radius) drawn with upsert inside a custom node
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { w?: number; h?: number; corner?: number };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class RectShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { w = 100, h = 60, corner = 8, fill, stroke, lineWidth } = attributes;
    // A rect is positioned by its top-left corner, so centre it on the node origin.
    return this.upsert(
      'key',
      'rect',
      { x: -w / 2, y: -h / 2, width: w, height: h, radius: corner, fill, stroke, lineWidth },
      container,
    );
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-rect', RectShapeNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { w: 120, h: 70, corner: 8 };
    const style = () => ({ w: v.w, h: v.h, corner: v.corner, size: [v.w, v.h] as [number, number], fill: '#61DDAA', stroke: '#B5F0D6', lineWidth: 3 });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-rect', style: { labelText: 'rect shape', labelPlacement: 'bottom' } },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'width', [40, 200, 1], v.w, (x) => ((v.w = x), void apply()));
      slider(stage.bar, 'height', [30, 120, 1], v.h, (x) => ((v.h = x), void apply()));
      slider(stage.bar, 'radius', [0, 40, 1], v.corner, (x) => ((v.corner = x), void apply()));
    } else {
      stage.every(800, (i) => {
        v.corner = (i * 6) % 36;
        v.w = i % 2 ? 130 : 90;
        return apply();
      });
    }
  });

export default mount;
