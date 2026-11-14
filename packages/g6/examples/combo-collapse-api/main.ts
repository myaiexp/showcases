// graph.collapseElement and graph.expandElement on combos, with the align option
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { nested } from '../../shared/combo-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: nested(),
        node: { style: { fill: '#7e3feb' } },
        combo: { style: { labelText: (d) => d.id, labelPlacement: 'top' } },
        animation: true,
      }),
    );
    await graph.render();
    let align = true;
    const isCollapsed = (id: string): boolean => Boolean(graph.getComboData(id).style?.collapsed);
    const flip = async (id: string): Promise<void> => {
      // align keeps the nodes that stay visible where they were instead of letting the combo recentre.
      if (isCollapsed(id)) await graph.expandElement(id, { align });
      else await graph.collapseElement(id, { align });
    };
    if (stage.bar) {
      toggle(stage.bar, 'align', align, (v) => (align = v));
      button(stage.bar, 'toggle combo1', () => void flip('combo1'));
      button(stage.bar, 'toggle combo2', () => void flip('combo2'));
    } else {
      stage.every(1400, (i) => flip(i % 4 < 2 ? 'combo1' : 'combo2'));
    }
  });

export default mount;
