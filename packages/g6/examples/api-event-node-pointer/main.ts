// Node pointer events in order: over, enter, move, down, up, click, out, leave
import { Graph, NodeEvent, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick, simHover } from '../../shared/behavior-sim.ts';
import { eventLog, flash } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 12, 3);
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
    let moves = 0;
    const names = [NodeEvent.POINTER_OVER, NodeEvent.POINTER_ENTER, NodeEvent.POINTER_DOWN, NodeEvent.POINTER_UP, NodeEvent.CLICK, NodeEvent.POINTER_OUT, NodeEvent.POINTER_LEAVE];
    for (const name of names) {
      graph.on(name, (e: IElementEvent) => {
        log(`${name}  ${e.target.id}`);
        if (name === NodeEvent.POINTER_OVER) flash(stage, graph, String(e.target.id), 700);
      });
    }
    graph.on(NodeEvent.POINTER_MOVE, () => {
      if (++moves % 4 === 1) log(`${NodeEvent.POINTER_MOVE}  #${moves}`);
    });
    await graph.render();
    log('hover and click a node');

    if (!stage.bar) {
      const at = cell(0, 1, 64);
      const next = cell(1, 2, 64);
      const steps = [
        () => simHover(graph, [at[0] - 20, at[1]]),
        () => simHover(graph, [at[0] + 2, at[1]]),
        () => simClick(stage, graph, at),
        () => simHover(graph, [32, 32]),
        () => simHover(graph, next),
        () => simHover(graph, null),
      ];
      stage.every(500, (i) => steps[(i - 1) % steps.length]!());
    }
  });

export default mount;
