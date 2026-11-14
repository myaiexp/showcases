// Atomic circle shape (cx, cy, r) drawn with upsert inside a custom node
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { r?: number };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

// The key shape is a plain G circle, created by upsert('key', 'circle', style, container).
class CircleShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { r = 30, fill, stroke, lineWidth } = attributes;
    return this.upsert('key', 'circle', { cx: 0, cy: 0, r, fill, stroke, lineWidth }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-circle', CircleShapeNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = (r: number) => ({ r, size: r * 2, fill: '#5B8FF9', stroke: '#9DB8FF', lineWidth: 3 });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style(40) } }] },
        node: { type: 'showcase-shape-circle', style: { labelText: 'circle shape', labelPlacement: 'bottom' } },
      }),
    );
    await graph.render();

    const setR = async (r: number): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style(r) }]);
      await graph.draw();
    };
    if (stage.bar) slider(stage.bar, 'r', [10, 80, 1], 40, (v) => void setR(v));
    else stage.every(900, (i) => setR(25 + ((i * 17) % 40)));
  });

export default mount;
