// setElementState with an id-to-state map: nodes and edges get different states in one awaited call
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { steps, strip } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: strip(4, 70),
        node: {
          style: { size: 34, lineWidth: 2, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' },
          state: {
            selected: { fill: '#F6BD16', stroke: '#fff' },
            highlight: { fill: '#E86452' },
            disabled: { fill: '#333', opacity: 0.5 },
          },
        },
        edge: { style: { lineWidth: 2 }, state: { highlight: { stroke: '#E86452', lineWidth: 4 }, selected: { stroke: '#F6BD16' } } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const run = (label: string, map: Record<string, string | string[]>) => ({
      label,
      run: async () => {
        const t = performance.now();
        await graph.setElementState(map);
        return `resolved after ${Math.round(performance.now() - t)} ms`;
      },
    });
    const clear = { n1: [], n2: [], n3: [], n4: [], e1: [], e2: [], e3: [] };
    steps(stage, el, [
      run("{ n1: 'selected', n2: ['highlight'], e1: 'highlight' }", { ...clear, n1: 'selected', n2: ['highlight'], e1: 'highlight' }),
      run("{ n3: 'disabled', n4: ['disabled'], e2: 'selected', e3: 'selected' }", { ...clear, n3: 'disabled', n4: ['disabled'], e2: 'selected', e3: 'selected' }),
      run('every id mapped to []', clear),
    ]);
  });

export default mount;
