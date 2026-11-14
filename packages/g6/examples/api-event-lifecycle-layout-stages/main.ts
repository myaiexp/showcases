// beforestagelayout and afterstagelayout fire once per layout in a pipeline, with its index and options
import { Graph, GraphEvent, type IGraphLifeCycleEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 12, 4);
    const nodes = Array.from({ length: 12 }, (_, i) => ({ id: `n${i}`, data: { group: i < 4 ? 'inner' : 'outer' } }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes, edges: nodes.slice(1).map((n, i) => ({ source: `n${i}`, target: n.id })) },
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#2a3550' } },
        // Two layouts run in turn: the inner four on a small circle, the outer eight on a big one.
        layout: [
          { type: 'circular', radius: 26, nodeFilter: (n: { data?: { group?: string } }) => n.data?.group === 'inner' },
          { type: 'circular', radius: 58, nodeFilter: (n: { data?: { group?: string } }) => n.data?.group === 'outer' },
        ],
        autoFit: 'center',
      }),
    );
    for (const name of [GraphEvent.BEFORE_LAYOUT, GraphEvent.BEFORE_STAGE_LAYOUT, GraphEvent.AFTER_STAGE_LAYOUT, GraphEvent.AFTER_LAYOUT]) {
      graph.on(name, (e: IGraphLifeCycleEvent) => {
        const index = (e.data as { index?: number } | undefined)?.index;
        log(`${name}${index === undefined ? '' : `  index ${index}`}`);
      });
    }
    await graph.render();

    if (stage.bar) button(stage.bar, 'layout() again', () => void graph.layout());
    else stage.every(2000, () => graph.layout());
  });

export default mount;
