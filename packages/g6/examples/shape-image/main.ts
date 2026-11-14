// Atomic image shape: src (generated data URL), width and height, drawn with upsert
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { avatar, picture } from '../../shared/images.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { src?: string; w?: number; h?: number };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class ImageShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { src = '', w = 80, h = 80 } = attributes;
    // x, y are the image's top-left corner.
    return this.upsert('key', 'image', { x: -w / 2, y: -h / 2, width: w, height: h, src }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-image', ImageShapeNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { w: 90, h: 90, i: 0 };
    const style = () => ({ src: v.i % 2 ? picture(v.i) : avatar(v.i), w: v.w, h: v.h, size: [v.w, v.h] as [number, number] });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-image' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'width', [30, 200, 1], v.w, (x) => ((v.w = x), void apply()));
      slider(stage.bar, 'height', [30, 160, 1], v.h, (x) => ((v.h = x), void apply()));
      slider(stage.bar, 'src (generated #)', [0, 7, 1], v.i, (x) => ((v.i = x), void apply()));
    } else {
      stage.every(1000, (i) => {
        v.i = i;
        v.w = 70 + (i % 3) * 25;
        return apply();
      });
    }
  });

export default mount;
