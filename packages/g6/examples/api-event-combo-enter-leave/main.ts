// pointerenter does not bubble but pointerover does: a combo reports both as the pointer moves onto its nodes
import { ComboEvent, Graph, NodeEvent, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simHover } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 12, 3);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'box', style: { x: 60, y: 60 } },
            { id: 'b', combo: 'box', style: { x: 150, y: 60 } },
          ],
          combos: [{ id: 'box', style: { labelText: 'box' } }],
        },
        node: { style: { size: 30, labelText: (d) => d.id, labelPlacement: 'center' } },
        combo: { state: { active: { stroke: '#F6BD16', lineWidth: 3 } } },
        autoFit: 'center',
      }),
    );
    const names = [
      ComboEvent.POINTER_OVER, ComboEvent.POINTER_ENTER, ComboEvent.POINTER_OUT, ComboEvent.POINTER_LEAVE,
      NodeEvent.POINTER_OVER, NodeEvent.POINTER_ENTER, NodeEvent.POINTER_OUT, NodeEvent.POINTER_LEAVE,
    ];
    for (const name of names) graph.on(name, (e: IElementEvent) => log(`${name}  ${e.target.id}`));
    await graph.render();
    log('move the pointer from outside the combo onto node a, then to node b');

    if (!stage.bar) {
      const path: ([number, number] | null)[] = [null, [105, 30], [60, 60], [105, 60], [150, 60], null];
      stage.every(900, (i) => simHover(graph, path[(i - 1) % path.length]!));
    }
  });

export default mount;
