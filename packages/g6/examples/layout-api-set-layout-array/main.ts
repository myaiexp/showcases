// The docs' Example 3: one setLayout call, two layouts, split by nodeFilter
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const nodes = [
      ...Array.from({ length: 5 }, (_, i) => ({ id: `main-${i}`, data: { type: 'main' } })),
      ...Array.from({ length: 8 }, (_, i) => ({ id: `sub-${i}`, data: { type: 'sub' } })),
    ];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes,
          edges: nodes.slice(1).map((n, i) => ({ id: `e${i}`, source: nodes[Math.floor(i / 2)]!.id, target: n.id })),
        },
        node: {
          style: { size: 18 },
          palette: { type: 'group', field: (d) => String(d.data?.type), color: ['#1783FF', '#F08F56'] },
        },
        layout: [{ type: 'grid' }],
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    const build = (flip: boolean) => [
      // The circular layout reaches nodes without x/y of its own, so it runs second and the grid row stays put.
      { type: 'grid', nodeFilter: (n: { data?: { type?: string } }) => n.data?.type === (flip ? 'sub' : 'main'), rows: 1, width: 360, height: 40 },
      { type: 'circular', nodeFilter: (n: { data?: { type?: string } }) => n.data?.type === (flip ? 'main' : 'sub'), radius: 100, center: [180, 150] as [number, number] },
    ];
    let flip = false;
    const apply = async (): Promise<void> => {
      graph.setLayout(build(flip));
      await graph.layout();
      await graph.fitView();
      flip = !flip;
    };
    await apply();

    if (stage.bar) button(stage.bar, 'swap groups', apply);
    else stage.every(2800, apply);
  });

export default mount;
