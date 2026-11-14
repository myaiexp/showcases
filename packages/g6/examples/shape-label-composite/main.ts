// A composite shape (text, background rect, dot) registered with ExtensionCategory.SHAPE
import { BaseShape, Circle, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type FancyStyle = { text?: string; fill?: string; fontSize?: number; backgroundFill?: string; dot?: string; offsetY?: number };
type Attrs = Required<BaseNodeStyleProps> & { fancy?: FancyStyle };
type Container = NonNullable<Parameters<Circle['render']>[1]>;

// Step 1: the shape. Text and background are sized together; the dot decorates the left.
class FancyLabel extends BaseShape<FancyStyle> {
  override render(attributes = this.parsedAttributes as FancyStyle, container: Container = this): void {
    const { text = '', fill = '#222', fontSize = 13, backgroundFill = '#fffbe6', dot = '#faad14', offsetY = 0 } = attributes;
    const w = text.length * fontSize * 0.58 + 22;
    const h = fontSize + 12;
    this.upsert('background', 'rect', { x: -w / 2, y: offsetY - h / 2, width: w, height: h, radius: h / 2, fill: backgroundFill }, container);
    this.upsert('text', 'text', { x: 6, y: offsetY, text, fill, fontSize, textAlign: 'center', textBaseline: 'middle' }, container);
    this.upsert('dot', 'circle', { cx: -w / 2 + 11, cy: offsetY, r: 3.5, fill: dot }, container);
  }
}
register(ExtensionCategory.SHAPE, 'showcase-shape-fancy-label', FancyLabel);

// Step 2: a node that places the registered shape by name through upsert.
class FancyNode extends Circle {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    this.upsert('fancy', 'showcase-shape-fancy-label', { ...attributes.fancy, offsetY: 52 }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-fancy-node', FancyNode);

const LABELS = ['Gateway', 'Auth service', 'Billing worker', 'DB'] as const;
const DOTS = { amber: '#faad14', green: '#52c41a', red: '#f5222d' } as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const fancy = (i: number, dot: string) => ({ text: LABELS[i % LABELS.length]!, dot });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, fancy: fancy(0, DOTS.amber) } }] },
        node: { type: 'showcase-shape-fancy-node', style: { size: 70, fill: '#1d3a5f', stroke: '#5B8FF9', lineWidth: 2 } },
      }),
    );
    await graph.render();

    const apply = async (i: number, dot: string): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: { fancy: fancy(i, dot) } }]);
      await graph.draw();
    };
    if (stage.bar) {
      let i = 0;
      let dot: string = DOTS.amber;
      select(stage.bar, 'text', LABELS, LABELS[0], (v) => ((i = LABELS.indexOf(v)), void apply(i, dot)));
      select(stage.bar, 'dot', Object.keys(DOTS) as (keyof typeof DOTS)[], 'amber', (v) => ((dot = DOTS[v]), void apply(i, dot)));
    } else {
      const dots = Object.values(DOTS);
      stage.every(1200, (i) => apply(i, dots[i % dots.length]!));
    }
  });

export default mount;
