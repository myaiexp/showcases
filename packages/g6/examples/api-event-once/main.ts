// graph.once: the listener runs for the first click only; on keeps counting every click
import { Graph, NodeEvent, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { eventLog, flash } from '../../shared/api-event-log.ts';
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
        node: {
          style: { size: 36, labelText: (d) => d.id, labelPlacement: 'center' },
          state: { active: { fill: '#F6BD16', stroke: '#fff', lineWidth: 3 } },
        },
        autoFit: 'center',
      }),
    );
    let clicks = 0;
    graph.on(NodeEvent.CLICK, () => log(`on:   click #${++clicks}`));
    const arm = (): void => {
      graph.once(NodeEvent.CLICK, (evt: IElementEvent) => {
        log(`once: first click on ${evt.target.id}, listener removed`);
        flash(stage, graph, String(evt.target.id), 800);
      });
      log('once: armed');
    };
    arm();
    await graph.render();

    if (stage.bar) button(stage.bar, 'arm once again', arm);
    else {
      stage.every(1000, (i) => {
        if (i % 4 === 1) arm();
        return simClick(stage, graph, cell(i % 2, i % 4, 64));
      });
    }
  });

export default mount;
