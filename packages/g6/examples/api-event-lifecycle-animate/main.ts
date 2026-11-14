// beforeanimate and afteranimate carry animationType: draw, collapse, expand or transform
import { Graph, GraphEvent, type IAnimateEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { button } from '../../shared/controls.ts';
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
            { id: 'a', combo: 'box', style: { x: 40, y: 50 } },
            { id: 'b', combo: 'box', style: { x: 100, y: 80 } },
            { id: 'c', style: { x: 200, y: 60 } },
          ],
          edges: [{ source: 'b', target: 'c' }],
          combos: [{ id: 'box' }],
        },
        node: { style: { size: 24 } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();
    // beforeanimate runs once per animation of that kind, afteranimate when it has finished.
    for (const name of [GraphEvent.BEFORE_ANIMATE, GraphEvent.AFTER_ANIMATE]) {
      graph.on(name, (e: IAnimateEvent) => log(`${name}  animationType: ${e.animationType}`));
    }

    let n = 0;
    const calls = {
      'updateNodeData + draw': async () => {
        graph.updateNodeData([{ id: 'c', style: { x: 200, y: ++n % 2 ? 110 : 40 } }]);
        await graph.draw();
      },
      'collapseElement(box)': () => graph.collapseElement('box', true),
      'expandElement(box)': () => graph.expandElement('box', true),
      'translateBy([30, 0], true)': () => graph.translateBy([n % 2 ? 30 : -30, 0], true),
    };
    if (stage.bar) for (const [label, run] of Object.entries(calls)) button(stage.bar, label, () => void run());
    else {
      const list = Object.values(calls);
      stage.every(1900, (i) => list[(i - 1) % list.length]!());
    }
  });

export default mount;
