// Atomic ellipse shape (cx, cy, rx, ry) drawn with upsert inside a custom node
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { rx?: number; ry?: number };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class EllipseShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { rx = 60, ry = 30, fill, stroke, lineWidth } = attributes;
    return this.upsert('key', 'ellipse', { cx: 0, cy: 0, rx, ry, fill, stroke, lineWidth }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-ellipse', EllipseShapeNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { rx: 60, ry: 30 };
    const style = () => ({ ...v, size: [v.rx * 2, v.ry * 2] as [number, number], fill: '#F6BD16', stroke: '#FBE08A', lineWidth: 3 });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-ellipse', style: { labelText: 'ellipse shape', labelPlacement: 'bottom' } },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'rx', [10, 100, 1], v.rx, (x) => ((v.rx = x), void apply()));
      slider(stage.bar, 'ry', [10, 70, 1], v.ry, (x) => ((v.ry = x), void apply()));
    } else {
      stage.every(900, (i) => {
        v.rx = i % 2 ? 40 : 75;
        v.ry = i % 2 ? 50 : 25;
        return apply();
      });
    }
  });

export default mount;
