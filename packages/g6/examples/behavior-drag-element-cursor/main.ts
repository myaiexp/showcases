// drag-element cursor: the pointer shown over a draggable node and while dragging
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, simDrag } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const cursors = ['default', 'grab', 'grabbing', 'move', 'pointer', 'crosshair', 'not-allowed'] as const;
type Cursor = (typeof cursors)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        behaviors: [{ type: 'drag-element', key: 'drag', cursor: { default: 'default', grab: 'grab', grabbing: 'grabbing' } }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Hover a node, then drag it, and watch the mouse pointer.';
      const cfg: { default: Cursor; grab: Cursor; grabbing: Cursor } = { default: 'default', grab: 'grab', grabbing: 'grabbing' };
      for (const k of ['default', 'grab', 'grabbing'] as const) {
        select(stage.bar, k, cursors, cfg[k], (v: Cursor) => {
          cfg[k] = v;
          graph.updateBehavior({ key: 'drag', cursor: { ...cfg } });
        });
      }
    } else {
      // A card has no cursor to show, so it just drags a node back and forth.
      const [x, y] = cell(1, 2, 64);
      stage.every(1700, async (i) => {
        const [a, b] = i % 2 ? [[x, y], [x + 35, y - 30]] : [[x + 35, y - 30], [x, y]];
        await simDrag(stage, graph, line(a as [number, number], b as [number, number], 10), 30);
      });
    }
  });

export default mount;
