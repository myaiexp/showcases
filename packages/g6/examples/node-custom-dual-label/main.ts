// A custom node: Rect plus a subtitle text, registered under a showcase- name
import { ExtensionCategory, Graph, Rect, register, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = NonNullable<Parameters<Rect['render']>[0]> & { subtitle?: string };
type Container = NonNullable<Parameters<Rect['render']>[1]>;

// Step 1: extend a built-in node and add a shape in render().
class DualLabelNode extends Rect {
  protected getSubtitleStyle(attributes: Attrs) {
    return {
      x: 0,
      y: 45, // below the main label
      text: attributes.subtitle || '',
      fontSize: 12,
      fill: '#9aa7c7',
      textAlign: 'center' as const,
      textBaseline: 'middle' as const,
    };
  }

  protected drawSubtitleShape(attributes: Attrs, container: Container): void {
    this.upsert('subtitle', 'text', this.getSubtitleStyle(attributes), container);
  }

  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container); // the rect and the main label
    this.drawSubtitleShape(attributes, container);
  }
}

// Step 2: register once, under a name no other example uses.
register(ExtensionCategory.NODE, 'showcase-node-dual-label', DualLabelNode);

const SUBTITLES = ['Your First Custom Node', 'Rect plus a text shape', 'upsert() keeps it in sync'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // Step 3: use the registered name as node.type.
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1', style: { x: 140, y: 60 }, data: { title: 'Node A', subtitle: SUBTITLES[0] } }] },
        node: {
          type: 'showcase-node-dual-label',
          style: {
            size: [140, 40],
            fill: '#7FFFD4',
            stroke: '#5CACEE',
            lineWidth: 2,
            radius: 5,
            labelText: (d: NodeData) => String(d.data?.title),
            labelPlacement: 'center',
            labelFill: '#222',
            labelFontSize: 14,
            labelFontWeight: 500,
            // A style field the built-in rect does not know; the subclass reads it from attributes.
            subtitle: (d: NodeData) => String(d.data?.subtitle),
          },
        },
      }),
    );
    await graph.render();

    const setSubtitle = async (subtitle: string): Promise<void> => {
      graph.updateNodeData([{ id: 'node1', data: { title: 'Node A', subtitle } }]);
      await graph.draw();
    };

    if (stage.bar) select(stage.bar, 'subtitle', SUBTITLES, SUBTITLES[0]!, (v) => void setSubtitle(v));
    else stage.every(1400, (i) => setSubtitle(SUBTITLES[i % SUBTITLES.length]!));
  });

export default mount;
