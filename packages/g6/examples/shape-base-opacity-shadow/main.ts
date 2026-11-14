// Common shape props: opacity, fillOpacity, strokeOpacity and shadow* on a circle
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps>;
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class GlowCircleNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { fill, stroke, lineWidth, opacity, fillOpacity, strokeOpacity, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY } =
      attributes;
    return this.upsert(
      'key',
      'circle',
      { cx: 0, cy: 0, r: 45, fill, stroke, lineWidth, opacity, fillOpacity, strokeOpacity, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY },
      container,
    );
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-glow-circle', GlowCircleNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { fillOpacity: 1, strokeOpacity: 1, blur: 24, dx: 10, dy: 10 };
    const style = () => ({
      size: 90,
      fill: '#5B8FF9',
      stroke: '#ffffff',
      lineWidth: 6,
      fillOpacity: v.fillOpacity,
      strokeOpacity: v.strokeOpacity,
      shadowBlur: v.blur,
      shadowColor: '#F6BD16',
      shadowOffsetX: v.dx,
      shadowOffsetY: v.dy,
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-glow-circle' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'fillOpacity', [0, 1, 0.05], v.fillOpacity, (x) => ((v.fillOpacity = x), void apply()));
      slider(stage.bar, 'strokeOpacity', [0, 1, 0.05], v.strokeOpacity, (x) => ((v.strokeOpacity = x), void apply()));
      slider(stage.bar, 'shadowBlur', [0, 60, 1], v.blur, (x) => ((v.blur = x), void apply()));
      slider(stage.bar, 'shadowOffsetX', [-30, 30, 1], v.dx, (x) => ((v.dx = x), void apply()));
      slider(stage.bar, 'shadowOffsetY', [-30, 30, 1], v.dy, (x) => ((v.dy = x), void apply()));
    } else {
      stage.every(500, (i) => {
        const a = i * 0.6;
        v.dx = Math.round(Math.cos(a) * 16);
        v.dy = Math.round(Math.sin(a) * 16);
        v.fillOpacity = 0.4 + 0.6 * Math.abs(Math.sin(a / 2));
        return apply();
      });
    }
  });

export default mount;
