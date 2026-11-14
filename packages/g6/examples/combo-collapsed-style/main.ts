// collapsed-prefixed combo styles: collapsedFill, collapsedStroke, collapsedSize and more
import { Graph, type ComboOptions, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const comboOf = (collapsedSize: number): ComboOptions => ({
  style: {
    fill: '#2f54eb',
    fillOpacity: 0.15,
    stroke: '#adc6ff',
    collapsedFill: '#1783FF',
    collapsedFillOpacity: 0.8,
    collapsedStroke: '#ffffff',
    collapsedLineWidth: 2,
    collapsedLineDash: [4, 3],
    collapsedSize,
    labelText: (d) => d.id,
  },
});

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
            { id: 'a1', combo: 'c1', style: { x: 60, y: 90 } },
            { id: 'a2', combo: 'c1', style: { x: 110, y: 120 } },
            { id: 'b1', combo: 'c2', style: { x: 200, y: 90 } },
            { id: 'b2', combo: 'c2', style: { x: 250, y: 120 } },
          ],
          // c1 starts expanded, c2 collapsed: the collapsed* styles apply to c2 only.
          combos: [{ id: 'c1' }, { id: 'c2', style: { collapsed: true } }],
        },
        combo: comboOf(50),
      }),
    );
    await graph.render();
    // Collapse and expand both combos by API so every combo meets both style sets.
    const toggleBoth = async (i: number): Promise<void> => {
      const first = i % 2 === 0;
      await Promise.all([first ? graph.collapseElement('c1') : graph.expandElement('c1'), first ? graph.expandElement('c2') : graph.collapseElement('c2')]);
    };
    if (stage.bar) {
      slider(stage.bar, 'collapsedSize', [20, 120, 1], 50, async (v) => {
        graph.setCombo(comboOf(v));
        await graph.draw();
      });
      graph.on('combo:dblclick', (e: IElementEvent) => {
        const id = e.target.id;
        void (graph.getComboData(id).style?.collapsed ? graph.expandElement(id) : graph.collapseElement(id));
      });
    } else {
      stage.every(1500, toggleBoth);
    }
  });

export default mount;
