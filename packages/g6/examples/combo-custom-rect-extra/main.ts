// A Rect combo subclass that adds a child-count tag through upsert in render
import { ExtensionCategory, Graph, RectCombo, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = NonNullable<Parameters<RectCombo['render']>[0]>;
type Container = NonNullable<Parameters<RectCombo['render']>[1]>;

class TaggedCombo extends RectCombo {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    const [w = 0, h = 0] = this.getKeySize(attributes);
    // The tag sits on the top-left corner and counts the direct children.
    const count = attributes.childrenData?.length ?? 0;
    this.upsert(
      'count-tag',
      'text',
      { x: -w / 2 + 6, y: -h / 2 + 12, text: `${count} children`, fontSize: 10, fill: '#FFC53D', textAlign: 'left' as const },
      container,
    );
  }
}

register(ExtensionCategory.COMBO, 'showcase-combo-tagged', TaggedCombo);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'n1', combo: 'c1', style: { x: 80, y: 80 } },
            { id: 'n2', combo: 'c1', style: { x: 150, y: 110 } },
            { id: 'n3', combo: 'c2', style: { x: 230, y: 90 } },
          ],
          combos: [{ id: 'c1' }, { id: 'c2' }],
        },
        node: { style: { fill: '#7e3feb' } },
        combo: { type: 'showcase-combo-tagged', style: { padding: 24, fillOpacity: 0.12 } },
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    // Moving n3 between combos shows the tag text follow the data.
    let into = 'c1';
    const move = async (): Promise<void> => {
      into = into === 'c1' ? 'c2' : 'c1';
      graph.updateNodeData([{ id: 'n2', combo: into }]);
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'move n2 to the other combo', () => void move());
    else stage.every(1500, move);
  });

export default mount;
