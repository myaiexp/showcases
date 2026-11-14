// Combo events: pointerover, click and drag on a combo, as distinct from the nodes inside it
import { ComboEvent, Graph, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, simClick, simDrag, simHover } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'left', style: { x: 40, y: 50 } },
            { id: 'b', combo: 'left', style: { x: 100, y: 90 } },
            { id: 'c', combo: 'right', style: { x: 230, y: 50 } },
            { id: 'd', combo: 'right', style: { x: 290, y: 90 } },
          ],
          combos: [{ id: 'left', style: { labelText: 'left' } }, { id: 'right', style: { labelText: 'right' } }],
        },
        node: { style: { size: 24 } },
        combo: { state: { active: { stroke: '#F6BD16', lineWidth: 3 } } },
        autoFit: 'view',
        padding: 20,
      }),
    );
    let drags = 0;
    graph.on(ComboEvent.POINTER_OVER, (e: IElementEvent) => (log(`${ComboEvent.POINTER_OVER}  ${e.target.id}`), graph.setElementState(String(e.target.id), 'active', false)));
    graph.on(ComboEvent.POINTER_OUT, (e: IElementEvent) => (log(`${ComboEvent.POINTER_OUT}  ${e.target.id}`), graph.setElementState(String(e.target.id), [], false)));
    graph.on(ComboEvent.CLICK, (e: IElementEvent) => log(`${ComboEvent.CLICK}  ${e.target.id}`));
    graph.on(ComboEvent.DRAG_START, (e: IElementEvent) => ((drags = 0), log(`${ComboEvent.DRAG_START}  ${e.target.id}`)));
    graph.on(ComboEvent.DRAG, () => drags++);
    graph.on(ComboEvent.DRAG_END, (e: IElementEvent) => log(`${ComboEvent.DRAG_END}  ${e.target.id} after ${drags} drag events`));
    await graph.render();
    log('hover, click and drag a combo (the nodes inside raise node events instead)');

    if (!stage.bar) {
      // A point inside the combo box but away from its nodes.
      const leftSpot: [number, number] = [70, 50];
      const rightSpot: [number, number] = [260, 90];
      const steps = [
        () => simHover(graph, leftSpot),
        () => simClick(stage, graph, leftSpot),
        () => simDrag(stage, graph, line(rightSpot, [rightSpot[0] + 30, rightSpot[1] - 20], 6)),
        () => simHover(graph, null),
      ];
      stage.every(1000, (i) => steps[(i - 1) % steps.length]!());
    }
  });

export default mount;
