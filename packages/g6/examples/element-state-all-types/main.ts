// State styles for nodes, edges and combos, set under each element option's state key
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mark } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'n1', combo: 'box', style: { x: 80, y: 80 } },
            { id: 'n2', combo: 'box', style: { x: 160, y: 130 } },
            { id: 'n3', style: { x: 330, y: 100 } },
          ],
          edges: [{ id: 'e1', source: 'n2', target: 'n3' }],
          combos: [{ id: 'box' }],
        },
        node: {
          style: { size: 34, fill: '#C6E5FF', stroke: '#5B8FF9', lineWidth: 1, labelText: (d) => d.id },
          state: {
            selected: { fill: '#95D6FB', stroke: '#1890FF', lineWidth: 2, shadowColor: '#1890FF', shadowBlur: 10 },
            highlight: { stroke: '#FF6A00', lineWidth: 3 },
            disabled: { fill: '#ECECEC', stroke: '#BFBFBF', opacity: 0.5 },
          },
        },
        edge: {
          style: { stroke: '#E2E2E2', lineWidth: 1 },
          state: { selected: { stroke: '#1890FF', lineWidth: 2 }, highlight: { stroke: '#FF6A00', lineWidth: 3 } },
        },
        combo: {
          style: { fill: '#F0F0F0', fillOpacity: 0.12, stroke: '#D9D9D9', labelText: (d) => d.id },
          state: { selected: { stroke: '#1890FF', lineWidth: 2 } },
        },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    const steps: Record<string, string>[] = [
      { n1: 'selected', e1: 'selected', box: 'selected' },
      { n1: 'highlight', n3: 'highlight', e1: 'highlight' },
      { n1: 'disabled', n2: 'disabled' },
      {},
    ];
    const names = ['selected', 'highlight', 'disabled', 'cleared'];
    if (stage.bar) steps.forEach((step, k) => button(stage.bar!, names[k]!, () => void mark(graph, step)));
    else stage.every(1300, (i) => mark(graph, steps[i % steps.length]!));
  });

export default mount;
