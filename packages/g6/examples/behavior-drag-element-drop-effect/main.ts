// drag-element dropEffect: what dropping a node over a combo does (move, link or none)
import { Graph } from '@antv/g6';
import type { GraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { line, overlay, simDrag, sleep } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const effects = ['move', 'link', 'none'] as const;
type Effect = (typeof effects)[number];

const fresh = (): GraphData => ({
  nodes: [
    { id: 'a', combo: 'left', style: { x: 40, y: 60 } },
    { id: 'b', combo: 'left', style: { x: 40, y: 130 } },
    { id: 'c', combo: 'right', style: { x: 220, y: 95 } },
  ],
  edges: [],
  combos: [{ id: 'left', style: { labelText: 'left' } }, { id: 'right', style: { labelText: 'right' } }],
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: fresh(),
        behaviors: [{ type: 'drag-element', key: 'drag', dropEffect: 'move' }],
        autoFit: 'view',
        padding: 20,
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Drag a node into the other combo. move keeps its parent but resizes it, link re-parents it, none only moves it.';
      select(stage.bar, 'dropEffect', effects, 'move', (dropEffect: Effect) => graph.updateBehavior({ key: 'drag', dropEffect }));
    } else {
      const say = overlay(stage);
      stage.every(3000, async (i) => {
        const e = effects[(i - 1) % effects.length]!;
        graph.updateBehavior({ key: 'drag', dropEffect: e });
        say(`dropEffect: '${e}'`);
        graph.setData(fresh());
        await graph.render();
        await sleep(300);
        await simDrag(stage, graph, line(graph.getElementPosition('a'), graph.getElementPosition('c'), 12), 40);
      });
    }
  });

export default mount;
