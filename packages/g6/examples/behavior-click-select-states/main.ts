// click-select state, neighborState and unselectedState, each set to a state name
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { clearStates, simClick, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const names = ['selected', 'active', 'highlight', 'inactive', 'disabled', 'none'] as const;
type Name = (typeof names)[number];
const val = (n: Name) => (n === 'none' ? undefined : n);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: ['node1', 'node2', 'node3', 'node4', 'node5'].map((id, i) => ({ id, style: { x: i * 56, y: 0 } })),
          edges: [
            { source: 'node1', target: 'node2' },
            { source: 'node2', target: 'node3' },
            { source: 'node3', target: 'node4' },
            { source: 'node4', target: 'node5' },
          ],
        },
        // The built-in states are styled by the theme; custom ones are defined here.
        node: { style: { fill: '#E4504D' }, state: { active: { fill: '#0f0' }, neighborActive: { fill: '#FFC40C', halo: true } } },
        behaviors: [
          { type: 'click-select', key: 'click', degree: 1, state: 'active', neighborState: 'neighborActive', unselectedState: 'inactive' },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Click a node: the node, its neighbours and everything else each get their own state.';
      // updateBehavior ignores undefined, so "none" rebuilds the behavior through setBehaviors.
      const cfg = { state: 'active' as Name, neighborState: 'neighborActive' as string, unselectedState: 'inactive' as Name };
      const rebuild = () =>
        graph.setBehaviors([
          {
            type: 'click-select',
            key: 'click',
            degree: 1,
            state: val(cfg.state),
            neighborState: cfg.neighborState === 'none' ? undefined : cfg.neighborState,
            unselectedState: val(cfg.unselectedState),
          },
        ]);
      select(stage.bar, 'state', names, 'active', (v) => ((cfg.state = v), rebuild()));
      select(stage.bar, 'neighborState', ['neighborActive', ...names] as const, 'neighborActive', (v) => ((cfg.neighborState = v), rebuild()));
      select(stage.bar, 'unselectedState', names, 'inactive', (v) => ((cfg.unselectedState = v), rebuild()));
    } else {
      const xs = [112, 56, 168];
      stage.every(2200, async (i) => {
        await clearStates(graph);
        await sleep(200);
        await simClick(stage, graph, [xs[i % xs.length]!, 0]);
      });
    }
  });

export default mount;
