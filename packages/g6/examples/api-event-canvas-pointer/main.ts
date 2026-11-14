// Canvas pointer events: pointerover, pointermove and pointerout as the pointer enters and leaves empty space
import { CanvasEvent, Graph, type IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { simHover } from '../../shared/behavior-sim.ts';
import { eventLog, who } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: lattice(4, 2, 64), node: { style: { size: 30 } }, autoFit: 'center' }),
    );
    let moves = 0;
    for (const name of [CanvasEvent.POINTER_OVER, CanvasEvent.POINTER_ENTER, CanvasEvent.POINTER_OUT, CanvasEvent.POINTER_LEAVE]) {
      graph.on(name, (e: IPointerEvent) => log(`${name}  (${who(e)})`));
    }
    graph.on(CanvasEvent.POINTER_MOVE, () => {
      // pointermove repeats, so only every fifth one is logged.
      if (++moves % 5 === 1) log(`${CanvasEvent.POINTER_MOVE}  #${moves}`);
    });
    await graph.render();
    log('move the pointer over the graph');

    if (!stage.bar) {
      const path: [number, number][] = [[16, 32], [48, 32], [96, 32], [144, 32], [176, 32]];
      stage.every(450, (i) => simHover(graph, i % 7 === 6 ? null : path[(i - 1) % path.length]!));
    }
  });

export default mount;
