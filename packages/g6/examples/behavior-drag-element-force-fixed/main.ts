// drag-element-force fixed: whether a dragged node stays where it was dropped
import { Graph } from '@antv/g6';
import type { GraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, overlay, simDrag } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const fresh = (): GraphData => ({
  nodes: Array.from({ length: 10 }, (_, i) => ({ id: `${i}`, style: { labelText: `${i}`, labelPlacement: 'center', labelFill: '#fff' } })),
  edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 7], [0, 8], [0, 9], [2, 3], [4, 5], [4, 6], [5, 6]].map(([s, t]) => ({ source: `${s}`, target: `${t}` })),
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: fresh(),
        node: { style: { size: 22 } },
        layout: { type: 'd3-force', link: { distance: stage.preview ? 50 : 100, strength: 2 }, collide: { radius: stage.preview ? 20 : 40 } },
        behaviors: [{ type: 'drag-element-force', key: 'drag', fixed: true }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag nodes around. With fixed on they stay put; off, the layout pulls them back.';
      toggle(stage.bar, 'fixed', true, (fixed) => graph.updateBehavior({ key: 'drag', fixed }));
    } else {
      const say = overlay(stage);
      stage.every(2600, async (i) => {
        const fixed = Math.floor((i - 1) / 2) % 2 === 0;
        graph.updateBehavior({ key: 'drag', fixed });
        say(`fixed: ${fixed}`);
        if (i % 2 === 1) {
          graph.setData(fresh());
          await graph.render();
        }
        const p = graph.getElementPosition('6');
        await simDrag(stage, graph, line(p, [p[0] + 45, p[1] + 25], 10), 35);
      });
    }
  });

export default mount;
