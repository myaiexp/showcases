// getElementData() takes any element id, node or edge, and returns its data
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { callList, json, people } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: people(),
        node: { style: { size: 26, labelText: (d) => d.id } },
        edge: { style: { endArrow: true, labelText: (d) => d.id, labelBackground: true } },
        autoFit: 'view',
        padding: 24,
      }),
    );
    await graph.render();

    callList(stage, graph, el, [
      { label: "getElementData('alice')", run: () => ({ found: ['alice'], text: json(graph.getElementData('alice')) }) },
      { label: "getElementData('e3')", run: () => ({ found: ['e3'], text: json(graph.getElementData('e3')) }) },
      {
        label: "getElementData(['carol', 'e6'])",
        run: () => {
          const found = graph.getElementData(['carol', 'e6']);
          return { found: ['carol', 'e6'], text: json(found) };
        },
      },
    ]);
  });

export default mount;
