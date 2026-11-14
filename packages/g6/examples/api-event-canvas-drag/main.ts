// Canvas drag events: dragstart, drag and dragend while the pointer moves over the empty background
import { CanvasEvent, Graph, type IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: lattice(4, 2, 64), node: { style: { size: 30 } }, autoFit: 'center' }),
    );
    let moves = 0;
    graph.on(CanvasEvent.DRAG_START, () => ((moves = 0), log('canvas:dragstart')));
    // drag fires on every move, so the log counts them rather than printing each one.
    graph.on(CanvasEvent.DRAG, () => moves++);
    graph.on(CanvasEvent.DRAG_END, (e: IPointerEvent) => log(`canvas:dragend after ${moves} drag events at client (${Math.round(e.client.x)}, ${Math.round(e.client.y)})`));
    await graph.render();
    log('drag on the empty background (no drag-canvas behavior is set, so the view stays put)');

    if (!stage.bar) {
      const paths = [line([16, 32], [176, 32], 8), line([176, 32], [16, 32], 8)];
      stage.every(1800, (i) => simDrag(stage, graph, paths[(i - 1) % 2]!));
    }
  });

export default mount;
