// upsert creates, updates or deletes a shape (style false) and its hooks report which
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { parts?: Record<string, boolean> };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

let log: (line: string) => void = () => {};

class PartsNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { parts = {} } = attributes;
    const hooks = (name: string) => ({
      afterCreate: () => log(`${name}: created`),
      afterUpdate: () => log(`${name}: updated`),
      beforeDestroy: () => log(`${name}: destroyed`),
    });
    // Describe the shapes wanted now; false removes one that exists.
    this.upsert('dot', 'circle', parts.dot ? { cx: 0, cy: -34, r: 12, fill: '#F6BD16' } : false, container, hooks('dot'));
    this.upsert('bar', 'rect', parts.bar ? { x: -45, y: 28, width: 90, height: 14, radius: 7, fill: '#61DDAA' } : false, container, hooks('bar'));
    return this.upsert('key', 'circle', { cx: 0, cy: 0, r: 30, fill: '#5B8FF9', stroke: '#9DB8FF', lineWidth: 3 }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-parts-node', PartsNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const parts = { dot: true, bar: false };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, size: 90, parts: { ...parts } } }] },
        node: { type: 'showcase-shape-parts-node' },
      }),
    );
    const out = stage.bar ? readout(el) : null;
    const lines: string[] = [];
    log = (line) => {
      lines.unshift(line);
      if (out) out.textContent = lines.slice(0, 6).join('\n');
    };
    stage.onCleanup(() => (log = () => {}));
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: { parts: { ...parts } } }]);
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, "'dot' shape", parts.dot, (x) => ((parts.dot = x), void apply()));
      toggle(stage.bar, "'bar' shape", parts.bar, (x) => ((parts.bar = x), void apply()));
    } else {
      stage.every(1000, (i) => {
        parts.dot = i % 4 < 2;
        parts.bar = i % 4 === 1 || i % 4 === 2;
        return apply();
      });
    }
  });

export default mount;
