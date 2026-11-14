// The five built-in states, with the dark theme's own styles for them on nodes and edges
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const STATES = ['selected', 'active', 'highlight', 'inactive', 'disabled'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // Each node and the edge to the next one carry one state; none of them is styled here.
    const at = (i: number) => ({ x: (i % 3) * 120, y: Math.floor(i / 3) * 110 });
    const nodes = STATES.map((s, i) => ({ id: s, style: at(i) }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [...nodes, { id: 'normal', style: at(5) }],
          edges: [...STATES.slice(1), 'normal'].map((s, i) => ({ id: `e-${s}`, source: STATES[i]!, target: s })),
        },
        node: { style: { size: 40, labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    // Nodes and their outgoing edges share a state name, so one call styles both.
    await graph.setElementState(
      Object.fromEntries(STATES.flatMap((s, i) => [[s, s], [`e-${STATES[i + 1] ?? 'normal'}`, s]])),
    );
    if (stage.preview) {
      // Cycle which node is lit by moving the states round.
      stage.every(1200, (i) =>
        graph.setElementState(Object.fromEntries(STATES.map((s, k) => [s, STATES[(k + i) % 5]!]))),
      );
    }
  });

export default mount;
