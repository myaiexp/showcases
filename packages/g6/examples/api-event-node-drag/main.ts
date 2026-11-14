// Node drag events: dragstart, drag with dx and dy, and dragend, from a pointer drag that starts on a node
import { Graph, NodeEvent, type IDragEvent, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
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
    let drags = 0;
    graph.on(NodeEvent.DRAG_START, (e: IElementEvent) => ((drags = 0), log(`${NodeEvent.DRAG_START}  ${e.target.id}`), flash(stage, graph, String(e.target.id), 1200)));
    graph.on(NodeEvent.DRAG, (e: IDragEvent) => (++drags % 4 === 1 ? log(`${NodeEvent.DRAG}  #${drags} dx ${Math.round(e.dx)} dy ${Math.round(e.dy)}`) : undefined));
    graph.on(NodeEvent.DRAG_END, (e: IElementEvent) => log(`${NodeEvent.DRAG_END}  ${e.target.id} after ${drags} drag events`));
    await graph.render();
    log('drag a node (no drag-element behavior: the node itself stays)');

    if (!stage.bar) {
      const a = cell(0, 1, 64);
      const b = cell(1, 2, 64);
      const routes = [line(a, [a[0] + 50, a[1] + 40], 8), line(b, [b[0] - 40, b[1] - 30], 8)];
      stage.every(1700, (i) => simDrag(stage, graph, routes[(i - 1) % 2]!));
    }
  });

export default mount;
