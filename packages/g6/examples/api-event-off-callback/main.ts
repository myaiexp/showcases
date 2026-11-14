// graph.off(eventName, callback) removes one listener of an event and keeps the other
import { Graph, NodeEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 8, 3);
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', data: lattice(4, 2, 64), node: { style: { size: 36 } }, autoFit: 'center' }),
    );
    // The callback must be the same function object that was added.
    const first = (): void => log('listener A: node clicked');
    const second = (): void => log('listener B: node clicked');
    graph.on(NodeEvent.CLICK, first);
    graph.on(NodeEvent.CLICK, second);
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'off(node:click, A)', () => (graph.off(NodeEvent.CLICK, first), log('A removed')));
      button(stage.bar, 'off(node:click, B)', () => (graph.off(NodeEvent.CLICK, second), log('B removed')));
      button(stage.bar, 'add A and B', () => (graph.off(NodeEvent.CLICK), graph.on(NodeEvent.CLICK, first), graph.on(NodeEvent.CLICK, second), log('A and B added')));
    } else {
      stage.every(1000, (i) => {
        if (i % 8 === 4) (graph.off(NodeEvent.CLICK, first), log('off(node:click, A)'));
        if (i % 8 === 0) (graph.on(NodeEvent.CLICK, first), log('A added again'));
        return simClick(stage, graph, cell(i % 2, (i % 3) + 1, 64));
      });
    }
  });

export default mount;
