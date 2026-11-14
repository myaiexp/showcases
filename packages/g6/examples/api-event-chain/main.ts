// graph.on returns the graph, so node, edge and canvas listeners chain in one expression
import { CanvasEvent, EdgeEvent, Graph, NodeEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 8, 3);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 2, 64),
        node: { style: { size: 36 } },
        edge: { style: { lineWidth: 6 } },
        autoFit: 'center',
      }),
    );
    graph
      .on(NodeEvent.CLICK, () => log('node:click'))
      .on(EdgeEvent.CLICK, () => log('edge:click'))
      .on(CanvasEvent.CLICK, () => log('canvas:click'));
    await graph.render();
    log('click a node, an edge or the background');

    if (!stage.bar) {
      const spots = [cell(0, 2, 64), [32, 0], [32, 32], cell(1, 1, 64), [96, 32]] as [number, number][];
      stage.every(1000, (i) => simClick(stage, graph, spots[(i - 1) % spots.length]!));
    }
  });

export default mount;
