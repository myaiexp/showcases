// collapse-expand onCollapse and onExpand: callbacks with the folded element's id
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simDblClick } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Double-click a combo.';
    const counts = { collapsed: 0, expanded: 0 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 70, y: 50 } },
            { id: 'node2', combo: 'combo1', style: { x: 140, y: 50 } },
            { id: 'node3', combo: 'combo2', style: { x: 100, y: 130 } },
          ],
          edges: [{ source: 'node2', target: 'node3' }],
          combos: [
            { id: 'combo1', combo: 'combo2', style: { labelText: 'combo1' } },
            { id: 'combo2', style: { labelText: 'combo2' } },
          ],
        },
        behaviors: [
          {
            type: 'collapse-expand',
            key: 'collapse',
            onCollapse: (id: string) => {
              counts.collapsed += 1;
              if (log) log.textContent = `onCollapse(${id}) -- collapsed ${counts.collapsed}, expanded ${counts.expanded}`;
            },
            onExpand: (id: string) => {
              counts.expanded += 1;
              if (log) log.textContent = `onExpand(${id}) -- collapsed ${counts.collapsed}, expanded ${counts.expanded}`;
            },
          },
        ],
        autoFit: 'view',
        padding: 16,
      }),
    );
    await graph.render();
    if (!stage.bar) {
      // The card shows the count in the combo's own label.
      const label = (c: typeof counts) => ({ id: 'combo2', style: { labelText: `combo2  folded ${c.collapsed} / opened ${c.expanded}` } });
      stage.every(1800, async () => {
        await simDblClick(stage, graph, graph.getElementPosition('combo1'));
        graph.updateComboData([label(counts)]);
        void graph.draw();
      });
    }
  });

export default mount;
