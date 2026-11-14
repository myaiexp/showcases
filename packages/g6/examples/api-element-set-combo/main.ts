// setCombo replaces the combo style mapping: fill, border and label of every combo change at once
import { Graph, type ComboData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a1', combo: 'one', style: { x: 0, y: 0 } },
            { id: 'a2', combo: 'one', style: { x: 60, y: 30 } },
            { id: 'b1', combo: 'two', style: { x: 190, y: 0 } },
            { id: 'b2', combo: 'two', style: { x: 250, y: 30 } },
          ],
          edges: [{ source: 'a2', target: 'b1' }],
          combos: [{ id: 'one' }, { id: 'two' }],
        },
        node: { style: { size: 24 } },
        combo: { style: { labelText: (d: ComboData) => d.id } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    const apply = (style: Record<string, unknown>, type?: string) => async () => {
      graph.setCombo({ type, style: { labelText: (d: ComboData) => d.id, ...style } });
      await graph.draw();
    };
    steps(stage, el, [
      { label: "setCombo({ style: { fill: 'orange' } })", run: apply({ fill: '#FA8C16', fillOpacity: 0.3, stroke: '#FA8C16' }) },
      { label: "setCombo({ type: 'circle', ... })", run: apply({ fill: '#5B8FF9', fillOpacity: 0.25, stroke: '#5B8FF9', lineWidth: 2 }, 'circle') },
      { label: "setCombo({ style: { lineDash } })", run: apply({ fill: '#61DDAA', fillOpacity: 0.15, stroke: '#61DDAA', lineWidth: 2, lineDash: [6, 4] }, 'rect') },
    ]);
  });

export default mount;
