// node:dblclick fires once for two quick clicks, after the two node:click events
import { Graph, NodeEvent, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simDblClick } from '../../shared/behavior-sim.ts';
import { eventLog, flash } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 2, 64),
        node: {
          style: { size: 36, labelText: (d) => d.id, labelPlacement: 'center' },
          state: { active: { fill: '#F6BD16', stroke: '#fff', lineWidth: 3 } },
        },
        autoFit: 'center',
      }),
    );
    graph.on(NodeEvent.CLICK, (e: IElementEvent) => log(`${NodeEvent.CLICK}  ${e.target.id}`));
    graph.on(NodeEvent.DBLCLICK, (e: IElementEvent) => {
      log(`${NodeEvent.DBLCLICK}  ${e.target.id}`);
      flash(stage, graph, String(e.target.id), 800);
    });
    await graph.render();
    log('double-click a node');

    if (!stage.bar) {
      const spots = [cell(0, 1, 64), cell(1, 2, 64), cell(0, 3, 64)];
      stage.every(1400, (i) => simDblClick(stage, graph, spots[(i - 1) % spots.length]!));
    }
  });

export default mount;
