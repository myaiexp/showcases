// Drop events on a node: dragenter, dragover, dragleave and drop, with drag-element's shadow as the dragged item
import { Graph, NodeEvent, type IElementEvent } from '@antv/g6';
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
        // G only reports a drop target when the dragged item follows the pointer, so a behavior is needed;
        // the shadow leaves the real node in place.
        behaviors: [{ type: 'drag-element', shadow: true, dropEffect: 'none' }],
        autoFit: 'center',
      }),
    );
    let overs = 0;
    graph.on(NodeEvent.DRAG_ENTER, (e: IElementEvent) => ((overs = 0), log(`${NodeEvent.DRAG_ENTER}  ${e.target.id}`), void graph.setElementState(String(e.target.id), 'active', false)));
    graph.on(NodeEvent.DRAG_OVER, () => overs++);
    graph.on(NodeEvent.DRAG_LEAVE, (e: IElementEvent) => (log(`${NodeEvent.DRAG_LEAVE}  ${e.target.id} (${overs} dragover)`), void graph.setElementState(String(e.target.id), [], false)));
    graph.on(NodeEvent.DROP, (e: IElementEvent) => (log(`${NodeEvent.DROP}  ${e.target.id}`), flash(stage, graph, String(e.target.id), 800)));
    await graph.render();
    log('drag a node over another one and release');

    if (!stage.bar) {
      const from = cell(0, 0, 64);
      const to = cell(1, 2, 64);
      stage.every(2200, (i) => simDrag(stage, graph, i % 2 ? line(from, to, 12) : line(cell(1, 3, 64), cell(0, 1, 64), 12), 40));
    }
  });

export default mount;
