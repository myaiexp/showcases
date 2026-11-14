// Element events for nodes, edges and combos, logged with the element id
import { ComboEvent, EdgeEvent, Graph, NodeEvent } from '@antv/g6';
import type { IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lineLog } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a', combo: 'box', style: { x: 90, y: 90 } },
            { id: 'b', combo: 'box', style: { x: 150, y: 110 } },
            { id: 'c', style: { x: 240, y: 90 } },
          ],
          edges: [{ id: 'a-c', source: 'a', target: 'c' }, { id: 'b-c', source: 'b', target: 'c' }],
          combos: [{ id: 'box' }],
        },
        node: { style: { size: 18, labelText: (d) => String(d.id) } },
        edge: { style: { lineWidth: 2, stroke: '#4a5a78' } },
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const { log } = lineLog(stage, el, 12);

    const on = (type: string) =>
      graph.on(type, (e: IElementEvent) => log(`${type}  ${e.target.id}`));
    on(NodeEvent.CLICK);
    on(NodeEvent.DRAG);
    on(EdgeEvent.CLICK);
    on(ComboEvent.CLICK);

    if (stage.preview) {
      // Cards have no pointer: emit element events with a stand-in target.
      const events: [string, string][] = [[NodeEvent.CLICK, 'a'], [NodeEvent.DRAG, 'c'], [EdgeEvent.CLICK, 'a-c'], [ComboEvent.CLICK, 'box']];
      stage.every(900, (i) => {
        const [type, id] = events[i % events.length]!;
        graph.emit(type, { type, target: { id } });
      });
    } else {
      log('drag a node, click a node, an edge or the combo');
    }
  });

export default mount;
