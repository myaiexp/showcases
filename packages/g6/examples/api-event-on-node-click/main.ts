// graph.on(NodeEvent.CLICK, handler): the handler gets the event, whose target is the clicked node
import { Graph, NodeEvent, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { eventLog, flash } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 8);
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
    graph.on(NodeEvent.CLICK, (evt: IElementEvent) => {
      const { target } = evt;
      log(`${NodeEvent.CLICK}  target.id = ${target.id}`);
      flash(stage, graph, String(target.id));
    });
    await graph.render();
    log('click a node' + (stage.bar ? ' (try the edges and the canvas: nothing is logged)' : ''));

    if (!stage.bar) {
      const ids = [[0, 1], [1, 2], [0, 3], [1, 0]] as const;
      stage.every(1100, (i) => {
        const [r, c] = ids[(i - 1) % ids.length]!;
        return simClick(stage, graph, cell(r, c, 64));
      });
    }
  });

export default mount;
