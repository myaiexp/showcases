// Atomic polyline shape: points plus lineJoin and lineCap on a thick stroke
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Join = 'miter' | 'round' | 'bevel';
type Cap = 'butt' | 'round' | 'square';
type Attrs = Required<BaseNodeStyleProps> & { join?: Join; cap?: Cap };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class PolylineShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { join = 'miter', cap = 'butt', stroke, lineWidth } = attributes;
    const points: [number, number][] = [[-70, 30], [-30, -30], [10, 30], [50, -30], [75, 10]];
    // fill none: a polyline is open, so a fill would close it visually.
    return this.upsert('key', 'polyline', { points, fill: 'none', stroke, lineWidth, lineJoin: join, lineCap: cap }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-polyline', PolylineShapeNode);

const JOINS: Join[] = ['miter', 'round', 'bevel'];
const CAPS: Cap[] = ['butt', 'round', 'square'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { join: 'miter' as Join, cap: 'butt' as Cap };
    const style = () => ({ join: v.join, cap: v.cap, size: 150, stroke: '#269A99', lineWidth: 18 });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-polyline' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'lineJoin', JOINS, v.join, (x) => ((v.join = x), void apply()));
      select(stage.bar, 'lineCap', CAPS, v.cap, (x) => ((v.cap = x), void apply()));
    } else {
      stage.every(1000, (i) => {
        v.join = JOINS[i % 3]!;
        v.cap = CAPS[Math.floor(i / 3) % 3]!;
        return apply();
      });
    }
  });

export default mount;
