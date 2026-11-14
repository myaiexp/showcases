// collapseElement on a combo: no options, a boolean animation flag, and the folded flag after it
import { Graph } from '@antv/g6';
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
            { id: 'node1', combo: 'combo1', style: { x: 60, y: 50 } },
            { id: 'node2', combo: 'combo1', style: { x: 130, y: 50 } },
            { id: 'node3', combo: 'combo2', style: { x: 230, y: 50 } },
            { id: 'node4', combo: 'combo2', style: { x: 300, y: 50 } },
            { id: 'node5', style: { x: 180, y: 140 } },
          ],
          edges: [
            { source: 'node2', target: 'node3' },
            { source: 'node1', target: 'node5' },
            { source: 'node4', target: 'node5' },
          ],
          combos: [{ id: 'combo1', style: { labelText: 'combo1' } }, { id: 'combo2', style: { labelText: 'combo2' } }],
        },
        node: { style: { size: 26 } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    const folded = (id: string): string => `${id} collapsed: ${graph.getComboData(id).style?.collapsed === true}`;
    steps(stage, el, [
      { label: "collapseElement('combo1')", run: async () => (await graph.collapseElement('combo1'), folded('combo1')) },
      { label: "collapseElement('combo2', true)", run: async () => (await graph.collapseElement('combo2', true), folded('combo2')) },
      { label: "expandElement('combo1', false)", run: async () => (await graph.expandElement('combo1', false), folded('combo1')) },
      { label: "expandElement('combo2', false)", run: async () => (await graph.expandElement('combo2', false), folded('combo2')) },
    ], { ms: 1700 });
  });

export default mount;
