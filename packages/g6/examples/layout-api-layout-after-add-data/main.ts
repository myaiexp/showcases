// The docs' Example 2: addData, draw, then layout() so the newcomers get positions
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ringGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: ringGraph(8, 2),
        node: { style: { size: 16 } },
        layout: { type: 'd3-force', manyBody: { strength: -80 }, link: { distance: 50 } },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    let count = 0;
    const grow = async (): Promise<void> => {
      if (count >= 9) return;
      const ids = [0, 1, 2].map((k) => `add${count + k}`);
      graph.addData({
        nodes: ids.map((id) => ({ id })),
        edges: ids.map((id, k) => ({ id: `${id}-e`, source: `n${(count + k * 3) % 8}`, target: id })),
      });
      count += 3;
      await graph.draw();
      await graph.layout();
      await graph.fitView();
    };

    if (stage.bar) button(stage.bar, 'addData + draw + layout (+3 nodes)', grow);
    else stage.every(2500, grow);
  });

export default mount;
