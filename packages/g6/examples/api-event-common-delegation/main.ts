// CommonEvent.CLICK hears every click and tells the target apart with event.targetType
import { CommonEvent, Graph, type IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 10, 3);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 2, 64),
        node: { style: { size: 30, labelText: (d) => d.id, labelPlacement: 'center' }, state: { active: { fill: '#F6BD16' } } },
        edge: { style: { lineWidth: 7 }, state: { active: { stroke: '#F6BD16' } } },
        autoFit: 'center',
      }),
    );
    // One listener on the unprefixed event replaces node:click, edge:click and canvas:click.
    graph.on(CommonEvent.CLICK, (e: IPointerEvent) => {
      const { targetType } = e;
      const id = targetType === 'canvas' ? undefined : String((e.target as { id: string }).id);
      log(`${CommonEvent.CLICK}  targetType: ${targetType}${id ? `, id: ${id}` : ''}`);
      if (id) {
        void graph.setElementState(id, 'active', false);
        stage.after(500, () => graph.destroyed || graph.setElementState(id, [], false));
      }
    });
    await graph.render();
    log('click a node, an edge or the background');

    if (!stage.bar) {
      const spots = [cell(0, 1, 64), [32, 0], [32, 32], cell(1, 3, 64), [160, 32]] as [number, number][];
      stage.every(1000, (i) => simClick(stage, graph, spots[(i - 1) % spots.length]!));
    }
  });

export default mount;
