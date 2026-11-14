// The NodeEvent constant and the string 'node:click' are the same event, so both listeners fire
import { Graph, NodeEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 8, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: lattice(4, 2, 64), node: { style: { size: 36 } }, autoFit: 'center' }),
    );
    graph.on(NodeEvent.CLICK, () => log(`NodeEvent.CLICK = '${NodeEvent.CLICK}'`));
    graph.on('node:click', () => log("'node:click' string"));
    graph.on(NodeEvent.DBLCLICK, () => log(`NodeEvent.DBLCLICK = '${NodeEvent.DBLCLICK}'`));
    await graph.render();
    log('click or double-click a node');

    if (!stage.bar) stage.every(1100, (i) => simClick(stage, graph, cell(i % 2, i % 4, 64)));
  });

export default mount;
