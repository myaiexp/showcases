// Atomic polygon shape: a points array rebuilt as a regular n-gon, with isClosed
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { points?: [number, number][]; closed?: boolean };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class PolygonShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { points = [], closed = true, fill, stroke, lineWidth } = attributes;
    return this.upsert('key', 'polygon', { points, isClosed: closed, fill, stroke, lineWidth }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-polygon', PolygonShapeNode);

const ngon = (n: number, r: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { n: 5, closed: true };
    const style = () => ({ points: ngon(v.n, 70), closed: v.closed, size: 140, fill: '#E86452', stroke: '#F5A79D', lineWidth: 4 });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-polygon' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'points', [3, 12, 1], v.n, (x) => ((v.n = x), void apply()));
      toggle(stage.bar, 'isClosed', v.closed, (x) => ((v.closed = x), void apply()));
    } else {
      stage.every(800, (i) => {
        v.n = 3 + (i % 7);
        return apply();
      });
    }
  });

export default mount;
