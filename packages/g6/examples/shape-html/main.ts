// Atomic html shape: innerHTML inside a custom node, with width and height
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { count?: number; w?: number; h?: number };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class HtmlShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { count = 0, w = 140, h = 70 } = attributes;
    const innerHTML = `<div style="box-sizing:border-box;width:100%;height:100%;padding:8px;border-radius:8px;background:#1d2a44;color:#e8eefc;font:13px system-ui,sans-serif;border:1px solid #5B8FF9"><b>HTML shape</b><br/>count: ${count}</div>`;
    return this.upsert('key', 'html', { x: -w / 2, y: -h / 2, width: w, height: h, innerHTML }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-html', HtmlShapeNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { count: 0, w: 150, h: 70 };
    const style = () => ({ count: v.count, w: v.w, h: v.h, size: [v.w, v.h] as [number, number] });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-html' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    // The innerHTML string is rebuilt from the data on every update; no handler is attached to it.
    if (stage.bar) {
      slider(stage.bar, 'count', [0, 99, 1], v.count, (x) => ((v.count = x), void apply()));
      slider(stage.bar, 'width', [100, 240, 1], v.w, (x) => ((v.w = x), void apply()));
      slider(stage.bar, 'height', [50, 140, 1], v.h, (x) => ((v.h = x), void apply()));
    } else {
      stage.every(900, (i) => {
        v.count = i;
        return apply();
      });
    }
  });

export default mount;
