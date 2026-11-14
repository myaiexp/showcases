// register() adds a node and a combo under one name, then options.node.type and combo.type use it
import { CircleCombo, ExtensionCategory, getExtension, Graph, Rect, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// register is global, so the name is prefixed; the guard skips a second registration when
// the example is mounted again (G6 5.1.1 would override and warn).
const NAME = 'showcase-graph-extension-register';

// getKeyStyle is protected and wants G6's fully parsed props, hence the loose casts below.
class DashedRect extends Rect {
  protected override getKeyStyle(attributes: ConstructorParameters<typeof Rect>[0]['style']) {
    return { ...super.getKeyStyle(attributes as never), radius: 12, lineDash: [5, 3], lineWidth: 2 };
  }
}

class TintedCombo extends CircleCombo {
  protected override getKeyStyle(attributes: ConstructorParameters<typeof CircleCombo>[0]['style']) {
    return { ...super.getKeyStyle(attributes as never), fill: '#ff9f43', fillOpacity: 0.15, stroke: '#ff9f43' };
  }
}

if (!getExtension(ExtensionCategory.NODE, NAME)) register(ExtensionCategory.NODE, NAME, DashedRect);
// A combo may use the same name as a node: extensions are keyed by category and name.
if (!getExtension(ExtensionCategory.COMBO, NAME)) register(ExtensionCategory.COMBO, NAME, TintedCombo);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'c', style: { x: 100, y: 100 } },
            { id: 'b', combo: 'c', style: { x: 190, y: 130 } },
            { id: 'free', style: { x: 320, y: 110 } },
          ],
          edges: [{ source: 'b', target: 'free' }],
          combos: [{ id: 'c' }],
        },
        node: { type: NAME, style: { size: [44, 30], labelText: (d) => d.id } },
        combo: { type: NAME },
        autoFit: 'view',
      }),
    );
    await graph.render();

    if (stage.bar) {
      readout(el).textContent = `getExtension(NODE, '${NAME}') -> ${getExtension(ExtensionCategory.NODE, NAME)?.name}\ngetExtension(COMBO, '${NAME}') -> ${getExtension(ExtensionCategory.COMBO, NAME)?.name}`;
    } else {
      stage.every(1400, (i) => graph.setElementState({ a: i % 2 ? 'selected' : [], c: i % 2 ? [] : 'selected' }));
    }
  });

export default mount;
