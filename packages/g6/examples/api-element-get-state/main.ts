// getElementState returns the array of states an element carries, in the order they were set
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
        data: strip(3, 100),
        node: {
          style: { size: 40, lineWidth: 2, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' },
          state: {
            selected: { fill: '#F6BD16', stroke: '#fff', lineWidth: 3 },
            active: { halo: true, haloStroke: '#5B8FF9', haloLineWidth: 10 },
          },
        },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const states = (id: string): string => JSON.stringify(graph.getElementState(id));
    steps(stage, el, [
      { label: "getElementState('n2')", run: () => states('n2') },
      { label: "setElementState('n2', 'selected')", run: async () => (await graph.setElementState('n2', 'selected'), states('n2')) },
      { label: "setElementState('n2', ['selected','active'])", run: async () => (await graph.setElementState('n2', ['selected', 'active']), states('n2')) },
      { label: "setElementState('n2', [])", run: async () => (await graph.setElementState('n2', []), states('n2')) },
    ]);
  });

export default mount;
