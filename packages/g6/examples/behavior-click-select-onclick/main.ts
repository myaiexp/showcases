// click-select onClick: a callback for every click, with the event's target
import { Graph } from '@antv/g6';
import type { IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Click anything to see the onClick event.';
    let count = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(3, 2, 70),
        node: { style: { labelText: (d) => String(d.id), labelFill: '#ddd', labelPlacement: 'bottom' }, state: { selected: { fill: '#ffa940' } } },
        behaviors: [
          {
            type: 'click-select',
            key: 'click',
            onClick: (event: IPointerEvent) => {
              count += 1;
              // A bare canvas click carries no element, only the target type.
              const t = event.target as { id?: string };
              if (log) log.textContent = `click #${count}: targetType=${event.targetType}${t.id ? `, id=${t.id}` : ''}`;
              else {
                graph.updateNodeData([{ id: 'n00', style: { labelText: `clicks: ${count}` } }]);
                void graph.draw();
              }
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (!stage.bar) {
      const targets: [number, number][] = [[70, 0], [140, 70], [-60, 150], [0, 70]];
      stage.every(1200, (i) => simClick(stage, graph, targets[i % targets.length]!));
    }
  });

export default mount;
