// The data option with nodes, edges and combos, as the options page writes it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 110, y: 120 }, data: { name: 'one' } },
            { id: 'node2', combo: 'combo1', style: { x: 190, y: 190 }, data: { name: 'two' } },
            { id: 'node3', style: { x: 320, y: 110 }, data: { name: 'three' } },
          ],
          edges: [
            { id: 'edge1', source: 'node1', target: 'node2' },
            { id: 'edge2', source: 'node2', target: 'node3' },
          ],
          combos: [{ id: 'combo1', style: { x: 150, y: 150 } }],
        },
        node: { style: { size: 26, labelText: (d) => String(d.data?.name) } },
        combo: { style: { labelText: (d) => d.id } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    if (stage.bar) {
      const out = readout(el);
      const count = (): void => {
        const d = graph.getData();
        out.textContent = `nodes ${d.nodes.length}, edges ${d.edges.length}, combos ${d.combos.length}`;
      };
      count();
      button(stage.bar, 'Collapse combo1', () => void graph.collapseElement('combo1'));
      button(stage.bar, 'Expand combo1', () => void graph.expandElement('combo1'));
    } else {
      // The combo is part of the data too: fold and unfold it so the card moves.
      stage.every(1800, (i) => (i % 2 ? graph.expandElement('combo1') : graph.collapseElement('combo1')));
    }
  });

export default mount;
