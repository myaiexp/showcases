// setElementVisibility with an id-to-visibility map: nodes and edges change in one call
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
        data: strip(5, 54),
        node: { style: { size: 30, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    steps(stage, el, [
      { label: "{ n2: 'hidden', n4: 'hidden', e2: 'hidden' }", run: () => graph.setElementVisibility({ n2: 'hidden', n4: 'hidden', e2: 'hidden' }, true) },
      { label: "{ n1: 'hidden', e3: 'hidden', n2: 'visible' }", run: () => graph.setElementVisibility({ n1: 'hidden', e3: 'hidden', n2: 'visible' }, true) },
      { label: 'every id back to visible', run: () => graph.setElementVisibility(Object.fromEntries(['n1', 'n2', 'n3', 'n4', 'n5', 'e1', 'e2', 'e3', 'e4'].map((id) => [id, 'visible' as const])), true) },
    ]);
  });

export default mount;
