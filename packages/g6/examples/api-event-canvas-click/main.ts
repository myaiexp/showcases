// Canvas events: click, double click, pointer down and up on the empty background
import { CanvasEvent, Graph, type IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick, simDblClick } from '../../shared/behavior-sim.ts';
import { eventLog, who } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: lattice(4, 2, 64), node: { style: { size: 30 } }, autoFit: 'center' }),
    );
    const events = [CanvasEvent.CLICK, CanvasEvent.DBLCLICK, CanvasEvent.POINTER_DOWN, CanvasEvent.POINTER_UP];
    for (const name of events) graph.on(name, (e: IPointerEvent) => log(`${name}  (${who(e)})`));
    await graph.render();
    log('click or double-click the empty background');

    if (!stage.bar) {
      const blank: [number, number] = [32, 32];
      const steps = [
        () => simClick(stage, graph, blank),
        () => simDblClick(stage, graph, [160, 32]),
        () => simClick(stage, graph, cell(0, 1, 64)),
      ];
      stage.every(1300, (i) => steps[(i - 1) % steps.length]!());
    }
  });

export default mount;
