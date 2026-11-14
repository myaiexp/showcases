// graph.off(eventName) removes the listeners of one event and leaves the others working
import { EdgeEvent, Graph, NodeEvent, type IElementEvent } from '@antv/g6';
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
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 2, 64),
        node: { style: { size: 36 } },
        edge: { style: { lineWidth: 6 } },
        autoFit: 'center',
      }),
    );
    const add = (): void => {
      graph.on(NodeEvent.CLICK, (e: IElementEvent) => log(`node:click ${e.target.id}`));
      graph.on(EdgeEvent.CLICK, (e: IElementEvent) => log(`edge:click ${e.target.id}`));
    };
    add();
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'off(NodeEvent.CLICK)', () => (graph.off(NodeEvent.CLICK), log('off(node:click): node clicks are no longer heard')));
      button(stage.bar, 'add both again', () => (graph.off(), add(), log('off() then both listeners added')));
    } else {
      stage.every(1000, (i) => {
        const k = i % 10;
        if (k === 5) (graph.off(NodeEvent.CLICK), log('off(node:click)'));
        if (k === 0) (graph.off(), add(), log('listeners added again'));
        return simClick(stage, graph, i % 2 ? cell(0, 1, 64) : [32, 0]);
      });
    }
  });

export default mount;
