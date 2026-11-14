// getElementDataByState() returns the nodes, edges or combos that currently carry a state
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { json, people } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const STATES = ['selected', 'highlight', 'disabled'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: people(),
        node: { style: { size: 22, labelText: (d) => d.id } },
        edge: { style: { endArrow: true } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    // Each element carries one state; the query below finds them again by state name.
    await graph.setElementState({ alice: 'selected', bob: 'highlight', carol: 'highlight', dave: 'disabled', e1: 'highlight', e2: 'selected' });

    const query = async (state: (typeof STATES)[number]): Promise<string> => {
      const nodes = graph.getElementDataByState('node', state);
      const edges = graph.getElementDataByState('edge', state);
      // The nodes found are drawn larger so the result shows on the canvas.
      const found = new Set(nodes.map((n) => n.id));
      graph.updateNodeData(graph.getNodeData().map((n) => ({ id: n.id, style: { size: found.has(n.id) ? 40 : 22 } })));
      await graph.draw();
      return `getElementDataByState('node', '${state}') -> ${json(nodes.map((n) => n.id))}\ngetElementDataByState('edge', '${state}') -> ${json(edges.map((e) => e.id))}`;
    };

    if (stage.bar) {
      const out = readout(el);
      const run = async (s: (typeof STATES)[number]): Promise<void> => void (out.textContent = await query(s));
      select(stage.bar, 'state', STATES, 'selected', (v) => void run(v));
      await run('selected');
    } else {
      stage.every(1400, (i) => query(STATES[i % STATES.length]!));
    }
  });

export default mount;
