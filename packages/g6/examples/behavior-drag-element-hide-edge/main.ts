// drag-element hideEdge: which edges disappear while a node is being dragged
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, overlay, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const modes = ['none', 'out', 'in', 'both', 'all'] as const;
type Mode = (typeof modes)[number];

// A directed hub: edges leave h towards the right and enter it from the left.
const nodes = [
  ['h', 130, 100], ['l1', 40, 40], ['l2', 40, 160], ['r1', 220, 40], ['r2', 220, 160], ['x', 130, 20], ['y', 130, 180],
] as const;
const edges = [['l1', 'h'], ['l2', 'h'], ['h', 'r1'], ['h', 'r2'], ['x', 'y']] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: nodes.map(([id, x, y]) => ({ id, style: { x, y } })),
          edges: edges.map(([source, target]) => ({ source, target })),
        },
        node: { style: { size: 20 } },
        edge: { style: { endArrow: true, lineWidth: 2 } },
        behaviors: [{ type: 'drag-element', key: 'drag', hideEdge: 'none' }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (hideEdge: Mode) => graph.updateBehavior({ key: 'drag', hideEdge });
    if (stage.bar) {
      readout(el).textContent = 'Drag the middle node (h): out hides edges leaving it, in hides those entering, all hides every edge.';
      select(stage.bar, 'hideEdge', modes, 'none', apply);
    } else {
      const say = overlay(stage);
      stage.every(2600, async (i) => {
        const m = modes[(i - 1) % modes.length]!;
        apply(m);
        say(`hideEdge: '${m}'`);
        // Slow drag, ending back at the start so the graph never drifts.
        await simDrag(stage, graph, [...line([130, 100], [150, 85], 6), ...line([150, 85], [130, 100], 6)], 110);
        await sleep(50);
      });
    }
  });

export default mount;
