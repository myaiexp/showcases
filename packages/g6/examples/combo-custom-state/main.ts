// A CircleCombo subclass whose getKeyStyle switches to a dashed glowing outline when selected
import { CircleCombo, type CircleComboStyleProps, ExtensionCategory, Graph, register, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

class GlowCombo extends CircleCombo {
  protected override getKeyStyle(attributes: Required<CircleComboStyleProps>) {
    const style = super.getKeyStyle(attributes);
    // The state list is part of attributes, so the class can branch on it directly.
    if ((attributes as { states?: string[] }).states?.includes('selected')) {
      return { ...style, stroke: '#1890ff', lineWidth: 3, lineDash: [6, 4], shadowColor: 'rgba(24,144,255,0.9)', shadowBlur: 15 };
    }
    return style;
  }
}

register(ExtensionCategory.COMBO, 'showcase-combo-glow', GlowCombo);

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
            { id: 'n1', combo: 'c1', style: { x: 70, y: 90 } },
            { id: 'n2', combo: 'c1', style: { x: 100, y: 120 } },
            { id: 'n3', combo: 'c2', style: { x: 220, y: 100 } },
          ],
          combos: [{ id: 'c1' }, { id: 'c2' }],
        },
        node: { style: { fill: '#7e3feb' } },
        combo: { type: 'showcase-combo-glow', style: { padding: 20, cursor: 'pointer', fillOpacity: 0.12, labelText: (d) => d.id } },
      }),
    );
    await graph.render();
    if (stage.bar) {
      graph.on('combo:click', (e: IElementEvent) => {
        const sel = graph.getElementState(e.target.id).includes('selected');
        void graph.setElementState(e.target.id, sel ? [] : ['selected']);
      });
    } else {
      stage.every(1000, (i) => graph.setElementState({ c1: i % 2 ? [] : ['selected'], c2: i % 2 ? ['selected'] : [] }));
    }
  });

export default mount;
