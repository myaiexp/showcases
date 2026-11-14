// translateElementBy moves one node by an offset, instantly or animated; edges follow
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { fmt, steps, strip } from '../../shared/api-element-demo.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: strip(3, 100),
        node: { style: { size: 34, labelText: (d: NodeData) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { lineWidth: 2 } },
        autoFit: 'center',
      }),
    );
    await graph.render();

    const at = (): string => fmt(graph.getElementPosition('n2'));
    steps(stage, el, [
      { label: "translateElementBy('n2', [0, -50])", run: async () => (await graph.translateElementBy('n2', [0, -50], false), at()) },
      { label: "translateElementBy('n2', [30, 100], true)", run: async () => (await graph.translateElementBy('n2', [30, 100], true), at()) },
      { label: "translateElementBy('n2', [-30, -50], true)", run: async () => (await graph.translateElementBy('n2', [-30, -50], true), at()) },
    ]);
  });

export default mount;
