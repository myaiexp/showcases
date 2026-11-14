// Atomic text shape: fontSize, fontWeight, letterSpacing, textDecorationLine
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { text?: string; font?: Record<string, unknown> };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class TextShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { text = '', font = {}, fill } = attributes;
    return this.upsert(
      'key',
      'text',
      { x: 0, y: 0, text, fill, textAlign: 'center', textBaseline: 'middle', ...font },
      container,
    );
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-text', TextShapeNode);

const DECORATIONS = ['none', 'underline', 'line-through', 'overline'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { fontSize: 32, fontWeight: 'bold', letterSpacing: 2, decoration: 'none' as (typeof DECORATIONS)[number] };
    const style = () => ({
      text: 'Text shape',
      size: 160,
      fill: '#F6BD16',
      font: {
        fontSize: v.fontSize,
        fontWeight: v.fontWeight,
        letterSpacing: v.letterSpacing,
        textDecorationLine: v.decoration,
        textDecorationColor: '#ffffff',
        textDecorationStyle: 'solid',
      },
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-text' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'fontSize', [12, 60, 1], v.fontSize, (x) => ((v.fontSize = x), void apply()));
      select(stage.bar, 'fontWeight', ['normal', 'bold', 'lighter'], v.fontWeight, (x) => ((v.fontWeight = x), void apply()));
      slider(stage.bar, 'letterSpacing', [0, 12, 1], v.letterSpacing, (x) => ((v.letterSpacing = x), void apply()));
      select(stage.bar, 'textDecorationLine', DECORATIONS, v.decoration, (x) => ((v.decoration = x), void apply()));
    } else {
      stage.every(900, (i) => {
        v.fontSize = 22 + ((i * 7) % 20);
        v.letterSpacing = (i * 2) % 8;
        v.decoration = DECORATIONS[i % 4]!;
        return apply();
      });
    }
  });

export default mount;
