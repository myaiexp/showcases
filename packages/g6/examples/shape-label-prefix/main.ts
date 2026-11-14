// Prefix separation: subStyleProps splits background* props off to a rect, the rest to text
import { BaseShape, Circle, ExtensionCategory, Graph, register, subStyleProps, type BaseNodeStyleProps, type BaseShapeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

interface TagStyle extends BaseShapeStyleProps {
  text?: string;
  fontSize?: number;
  background?: boolean;
  padding?: number;
  [key: string]: unknown;
}
type Attrs = Required<BaseNodeStyleProps> & { tag?: TagStyle };
type Container = NonNullable<Parameters<Circle['render']>[1]>;

class TagShape extends BaseShape<TagStyle> {
  override render(attributes = this.parsedAttributes as TagStyle, container: Container = this): void {
    const { text = '', fontSize = 14, background = true, padding = 6 } = attributes;
    // Every key that starts with 'background' (backgroundFill, backgroundRadius…) goes to the rect.
    const bg = subStyleProps<Record<string, unknown>>(attributes, 'background');
    const w = text.length * fontSize * 0.58 + padding * 2;
    const h = fontSize + padding * 2;
    this.upsert('background', 'rect', background ? { x: -w / 2, y: -h / 2, width: w, height: h, ...bg } : false, container);
    this.upsert('text', 'text', { text, fontSize, fill: attributes.fill as string, textAlign: 'center', textBaseline: 'middle' }, container);
  }
}
register(ExtensionCategory.SHAPE, 'showcase-shape-tag', TagShape);

class TagNode extends Circle {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    this.upsert('tag', 'showcase-shape-tag', { y: 0, ...attributes.tag }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-tag-node', TagNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { radius: 4, padding: 6, background: true, hue: 0 };
    const tag = (): TagStyle => ({
      text: 'prefix split',
      fill: '#222222',
      fontSize: 14,
      padding: v.padding,
      background: v.background,
      backgroundFill: `hsl(${40 + v.hue}, 90%, 70%)`,
      backgroundRadius: v.radius,
      backgroundStroke: '#ffffff',
      backgroundLineWidth: 2,
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, tag: tag() } }] },
        node: { type: 'showcase-shape-tag-node', style: { size: 120, fill: '#1d3a5f', stroke: '#5B8FF9', lineWidth: 2 } },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: { tag: tag() } }]);
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'background', v.background, (x) => ((v.background = x), void apply()));
      slider(stage.bar, 'backgroundRadius', [0, 20, 1], v.radius, (x) => ((v.radius = x), void apply()));
      slider(stage.bar, 'padding', [0, 20, 1], v.padding, (x) => ((v.padding = x), void apply()));
      slider(stage.bar, 'backgroundFill hue', [0, 300, 5], v.hue, (x) => ((v.hue = x), void apply()));
    } else {
      stage.every(700, (i) => {
        v.radius = (i * 5) % 20;
        v.hue = (i * 50) % 300;
        v.background = i % 6 !== 5;
        return apply();
      });
    }
  });

export default mount;
