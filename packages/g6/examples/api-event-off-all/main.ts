// graph.off() with no arguments removes every listener, node, edge and canvas alike
import { CanvasEvent, EdgeEvent, Graph, NodeEvent } from '@antv/g6';
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
    let listening = false;
    const on = (): void => {
      graph.on(NodeEvent.CLICK, () => log('node:click heard'));
      graph.on(CanvasEvent.CLICK, () => log('canvas:click heard'));
      graph.on(EdgeEvent.CLICK, () => log('edge:click heard'));
      listening = true;
      log('three listeners added');
    };
    const off = (): void => {
      graph.off();
      listening = false;
      log('graph.off(): all listeners removed');
    };
    on();
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'graph.on x3', () => !listening && on());
      button(stage.bar, 'graph.off()', off);
    } else {
      // Click a node and the canvas in turn; every other round, listening starts or stops.
      stage.every(1000, (i) => {
        if (i % 6 === 4) off();
        if (i % 6 === 0) on();
        return simClick(stage, graph, i % 2 ? cell(0, 1, 64) : [32, 32]);
      });
    }
  });

export default mount;
