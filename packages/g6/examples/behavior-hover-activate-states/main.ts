// hover-activate state and inactiveState: which states the hovered and the other elements get
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simHover } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const states = ['active', 'selected', 'custom'] as const;
const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: {
          state: {
            active: { fill: '#52c41a', halo: true, haloStroke: '#52c41a' },
            selected: { fill: '#ffa940', stroke: '#fff', lineWidth: 2 },
            custom: { fill: '#eb2f96', size: 30 },
          },
        },
        behaviors: [{ type: 'hover-activate', key: 'hover', degree: 1, state: 'active', inactiveState: 'inactive' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Hover a node: state is applied to it and its neighbour, inactiveState to every other element.';
      // updateBehavior ignores undefined, so dropping inactiveState rebuilds the behavior.
      const cfg: { state: (typeof states)[number]; inactive: boolean } = { state: 'active', inactive: true };
      const rebuild = () =>
        graph.setBehaviors([
          { type: 'hover-activate', key: 'hover', degree: 1, state: cfg.state, ...(cfg.inactive ? { inactiveState: 'inactive' } : {}) },
        ]);
      select(stage.bar, 'state', states, 'active', (v) => ((cfg.state = v), rebuild()));
      select(stage.bar, 'inactiveState', ['inactive', 'none'] as const, 'inactive', (v) => ((cfg.inactive = v === 'inactive'), rebuild()));
    } else {
      const spots = [cell(1, 1, 64), cell(1, 2, 64), cell(0, 3, 64)];
      stage.every(900, (i) => {
        if (i % 4 === 0) graph.updateBehavior({ key: 'hover', state: states[(i / 4) % states.length] });
        simHover(graph, i % 4 === 3 ? null : spots[i % 3]!);
      });
    }
  });

export default mount;
