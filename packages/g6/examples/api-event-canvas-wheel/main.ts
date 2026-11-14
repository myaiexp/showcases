// canvas:wheel carries the wheel deltas; no behavior is set, so the wheel only logs
import { CanvasEvent, Graph, type IWheelEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { simWheel } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: lattice(4, 2, 64), node: { style: { size: 30 } }, autoFit: 'center' }),
    );
    graph.on(CanvasEvent.WHEEL, (e: IWheelEvent) => log(`${CanvasEvent.WHEEL}  deltaY ${Math.round(e.deltaY)}  deltaX ${Math.round(e.deltaX)}`));
    await graph.render();
    log('scroll the wheel over the graph');

    if (!stage.bar) {
      const deltas = [-120, -120, 100, 240, -60];
      stage.every(700, (i) => simWheel(graph, [96, 32], deltas[(i - 1) % deltas.length]!));
    }
  });

export default mount;
