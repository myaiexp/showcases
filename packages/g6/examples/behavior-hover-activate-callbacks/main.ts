// hover-activate onHover and onHoverEnd: callbacks when the pointer enters and leaves
import { Graph } from '@antv/g6';
import type { IPointerEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simHover } from '../../shared/behavior-sim.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Move over the nodes.';
    let hovered = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { style: { labelText: (d) => String(d.id), labelFill: '#ddd', labelPlacement: 'bottom' }, state: { active: { fill: '#ffa940' } } },
        behaviors: [
          {
            type: 'hover-activate',
            key: 'hover',
            onHover: (e: IPointerEvent) => {
              hovered += 1;
              const id = (e.target as { id?: string }).id;
              if (log) log.textContent = `onHover: ${id} (${hovered} so far)`;
              else {
                graph.updateNodeData([{ id: 'n00', style: { labelText: `hovers: ${hovered}` } }]);
                void graph.draw();
              }
            },
            onHoverEnd: (e: IPointerEvent) => {
              if (log) log.textContent = `onHoverEnd: ${(e.target as { id?: string }).id}`;
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (!stage.bar) {
      const path = [cell(0, 1, 64), cell(1, 2, 64), null, cell(2, 3, 64), cell(1, 0, 64), null];
      stage.every(900, (i) => simHover(graph, path[i % path.length]!));
    }
  });

export default mount;
