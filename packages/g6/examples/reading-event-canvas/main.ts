// Canvas events: click, double click, drag and wheel on empty canvas
import { CanvasEvent, Graph } from '@antv/g6';
import type { IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lineLog, ringData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ringData(6),
        node: { style: { size: 14 } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular', radius: 60 },
        autoFit: 'center',
      }),
    );
    await graph.render();
    const { log } = lineLog(stage, el, 12);
    const watched = [
      CanvasEvent.CLICK,
      CanvasEvent.DBLCLICK,
      CanvasEvent.CONTEXT_MENU,
      CanvasEvent.DRAG_START,
      CanvasEvent.DRAG_END,
      CanvasEvent.WHEEL,
    ];
    for (const type of watched) {
      graph.on(type, (e: IPointerEvent) => {
        const at = e.client ? ` at client (${Math.round(e.client.x)}, ${Math.round(e.client.y)})` : '';
        log(`${type}${at}`);
      });
    }

    if (stage.preview) {
      // No pointer in a card: emit the same events by hand (graph.emit).
      stage.every(900, (i) => graph.emit(watched[i % watched.length]!, { type: watched[i % watched.length], client: { x: 100 + i * 7, y: 80 } }));
    } else {
      log('click, double-click, right-click, drag or wheel on the canvas');
    }
  });

export default mount;
