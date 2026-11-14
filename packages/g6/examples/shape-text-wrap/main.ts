// Atomic text shape in multiple lines: wordWrap, wordWrapWidth, maxLines, textOverflow
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { width?: number; lines?: number; overflow?: string };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

const TEXT = 'Elements in G6 are composed of one or more shapes, mainly added via upsert in the render method.';

class WrapTextNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { width = 140, lines = 3, overflow = 'ellipsis', fill } = attributes;
    return this.upsert(
      'key',
      'text',
      {
        x: 0,
        y: 0,
        text: TEXT,
        fill,
        fontSize: 14,
        textAlign: 'center',
        textBaseline: 'middle',
        wordWrap: true,
        wordWrapWidth: width,
        maxLines: lines,
        textOverflow: overflow,
      },
      container,
    );
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-text-wrap', WrapTextNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { width: 160, lines: 3, overflow: 'ellipsis' };
    const style = () => ({ ...v, size: 180, fill: '#9DDCF0' });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-text-wrap' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'wordWrapWidth', [60, 260, 5], v.width, (x) => ((v.width = x), void apply()));
      slider(stage.bar, 'maxLines', [1, 6, 1], v.lines, (x) => ((v.lines = x), void apply()));
      select(stage.bar, 'textOverflow', ['ellipsis', 'clip', '...more'], v.overflow, (x) => ((v.overflow = x), void apply()));
    } else {
      stage.every(1000, (i) => {
        v.width = 100 + ((i * 40) % 140);
        v.lines = 1 + (i % 4);
        return apply();
      });
    }
  });

export default mount;
