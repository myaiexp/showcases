// A behavior is event listening: node clicks and edge hovers handled with graph.on
import { EdgeEvent, Graph, NodeEvent } from '@antv/g6';
import type { IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick, simHover } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Click a node, hover an edge: both are handled by graph.on listeners, with no behavior configured.';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { state: { selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 } } },
        edge: { style: { lineWidth: 4 }, state: { highlight: { stroke: '#52c41a' } } },
        autoFit: 'center',
      }),
    );
    // Listeners live on the graph and go when it is destroyed.
    graph.on(NodeEvent.CLICK, (evt: IElementEvent) => {
      const { target } = evt;
      graph.setElementState(target.id, 'selected');
      if (log) log.textContent = `${NodeEvent.CLICK}: ${target.id} -> selected`;
    });
    graph.on(EdgeEvent.POINTER_OVER, (evt: IElementEvent) => {
      graph.setElementState(evt.target.id, 'highlight');
      if (log) log.textContent = `${EdgeEvent.POINTER_OVER}: ${evt.target.id} -> highlight`;
    });
    graph.on(EdgeEvent.POINTER_OUT, (evt: IElementEvent) => {
      graph.setElementState(evt.target.id, []);
    });
    await graph.render();
    if (!stage.bar) {
      const [x, y] = cell(1, 1, 64);
      const steps: (() => unknown)[] = [
        () => simClick(stage, graph, [x, y]),
        () => simHover(graph, [x + 32, y]),
        () => simHover(graph, null),
        () => simClick(stage, graph, cell(2, 2, 64)),
        () => simHover(graph, [x, y + 32]),
        () => simHover(graph, null),
      ];
      stage.every(1000, (i) => steps[i % steps.length]!());
    }
  });

export default mount;
