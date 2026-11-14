// Edge events: pointerover, pointerout, click and dblclick, with the hovered edge lit
import { EdgeEvent, Graph, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { simClick, simDblClick, simHover } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 2, 64),
        node: { style: { size: 26 } },
        // A thick edge is easier to hit; the active state is lit by the listeners below.
        edge: { style: { lineWidth: 7 }, state: { active: { stroke: '#F6BD16' } } },
        autoFit: 'center',
      }),
    );
    graph.on(EdgeEvent.POINTER_OVER, (e: IElementEvent) => (log(`${EdgeEvent.POINTER_OVER}  ${e.target.id}`), graph.setElementState(String(e.target.id), 'active', false)));
    graph.on(EdgeEvent.POINTER_OUT, (e: IElementEvent) => (log(`${EdgeEvent.POINTER_OUT}  ${e.target.id}`), graph.setElementState(String(e.target.id), [], false)));
    graph.on(EdgeEvent.CLICK, (e: IElementEvent) => log(`${EdgeEvent.CLICK}  ${e.target.id}`));
    graph.on(EdgeEvent.DBLCLICK, (e: IElementEvent) => log(`${EdgeEvent.DBLCLICK}  ${e.target.id}`));
    await graph.render();
    log('hover, click and double-click an edge');

    if (!stage.bar) {
      const mid1: [number, number] = [32, 0];
      const mid2: [number, number] = [160, 64];
      const steps = [
        () => simHover(graph, mid1),
        () => simClick(stage, graph, mid1),
        () => simHover(graph, null),
        () => simHover(graph, mid2),
        () => simDblClick(stage, graph, mid2),
        () => simHover(graph, null),
      ];
      stage.every(600, (i) => steps[(i - 1) % steps.length]!());
    }
  });

export default mount;
