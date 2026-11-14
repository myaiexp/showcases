// collapse-expand enable as a function: two behaviors, each limited to one combo
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simClick, simDblClick } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 200, y: 60 } },
            { id: 'node2', combo: 'combo1', style: { x: 200, y: 110 } },
            { id: 'node3', combo: 'combo2', style: { x: 60, y: 60 } },
            { id: 'node4', combo: 'combo2', style: { x: 30, y: 110 } },
            { id: 'node5', combo: 'combo2', style: { x: 90, y: 110 } },
          ],
          edges: [
            { source: 'node1', target: 'node2' },
            { source: 'node3', target: 'node4' },
            { source: 'node3', target: 'node5' },
          ],
          combos: [
            { id: 'combo1', style: { labelText: 'double-click', collapsed: true } },
            { id: 'combo2', style: { labelText: 'click' } },
          ],
        },
        behaviors: [
          { type: 'collapse-expand', trigger: 'dblclick', enable: (e: { targetType: string; target: { id: string } }) => e.targetType === 'combo' && e.target.id === 'combo1' },
          { type: 'collapse-expand', trigger: 'click', enable: (e: { targetType: string; target: { id: string } }) => e.targetType === 'combo' && e.target.id === 'combo2' },
        ],
        autoFit: 'view',
        padding: 16,
      }),
    );
    await graph.render();
    if (stage.bar) readout(el).textContent = 'Left combo folds on a click, right combo on a double click; each ignores the other gesture.';
    else {
      stage.every(1700, async (i) => {
        if (i % 2 === 1) await simClick(stage, graph, graph.getElementPosition('combo2'));
        else await simDblClick(stage, graph, graph.getElementPosition('combo1'));
      });
    }
  });

export default mount;
