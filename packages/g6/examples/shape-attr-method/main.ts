// shape.attr(name), attr(name, value) and attr({...}) on a shape kept from upsert
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps>;
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;
type Shape = { attr(name: string): unknown; attr(name: string, value: unknown): void; attr(styles: Record<string, unknown>): void };

// Module variable: the shapes made by the nodes of the live example (cleared on unmount).
const shapes: Shape[] = [];

class AttrCircleNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { fill, stroke, lineWidth } = attributes;
    return this.upsert('key', 'circle', { cx: 0, cy: 0, r: 40, fill, stroke, lineWidth }, container, {
      afterCreate: (shape) => shapes.push(shape as unknown as Shape),
    });
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-attr-circle', AttrCircleNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    shapes.length = 0;
    stage.onCleanup(() => (shapes.length = 0));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100 } }] },
        node: { type: 'showcase-shape-attr-circle', style: { size: 80, fill: '#5B8FF9', stroke: '#9DB8FF', lineWidth: 3 } },
      }),
    );
    await graph.render();

    const out = stage.bar ? readout(el) : null;
    const colors = ['#E86452', '#61DDAA', '#F6BD16', '#9270CA'];
    let n = 0;
    const log = (line: string): void => {
      if (out) out.textContent = line;
    };
    // attr() writes straight to the G shape, so the change skips the node's data and style.
    const setFill = (): void => {
      shapes[0]?.attr('fill', colors[++n % colors.length]);
      log("shape.attr('fill', …) set the fill");
    };
    const setMany = (): void => {
      shapes[0]?.attr({ stroke: '#ffffff', lineWidth: 2 + (++n % 5) * 3, lineDash: n % 2 ? [6, 4] : [] });
      log('shape.attr({ stroke, lineWidth, lineDash }) updated three props');
    };
    const read = (): void => log(`shape.attr('fill') => ${String(shapes[0]?.attr('fill'))}`);

    if (stage.bar) {
      button(stage.bar, "attr('fill', value)", setFill);
      button(stage.bar, 'attr({ … })', setMany);
      button(stage.bar, "attr('fill')", read);
    } else {
      stage.every(900, (i) => (i % 2 ? setMany() : setFill()));
    }
  });

export default mount;
