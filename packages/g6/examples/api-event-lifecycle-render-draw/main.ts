// GraphEvent render, draw and layout pairs: which fire for render(), for draw() and for layout()
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { eventLog } from '../../shared/api-event-log.ts';
import { button } from '../../shared/controls.ts';
import { ring } from '../../shared/graph-basics.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = eventLog(stage, el, 12, 4);
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(6, 'n', 70),
        node: { style: { size: 24 } },
        autoFit: 'center',
      }),
    );
    // Listeners are added before the first render so the very first sequence is seen too.
    const names = [GraphEvent.BEFORE_RENDER, GraphEvent.AFTER_RENDER, GraphEvent.BEFORE_DRAW, GraphEvent.AFTER_DRAW, GraphEvent.BEFORE_LAYOUT, GraphEvent.AFTER_LAYOUT];
    let note = '';
    for (const name of names) graph.on(name, () => log(`${name}${note}`));
    note = '  (render)';
    await graph.render();

    const calls = {
      'render()': async () => ((note = '  (render)'), graph.render()),
      'draw()': async () => ((note = '  (draw)'), graph.draw()),
      'layout()': async () => ((note = '  (layout)'), graph.layout({ type: 'circular', radius: 40 + (Math.random() > 0.5 ? 30 : 0) })),
    };
    if (stage.bar) for (const [label, run] of Object.entries(calls)) button(stage.bar, label, () => void run());
    else {
      const list = Object.values(calls);
      stage.every(1600, (i) => list[(i - 1) % list.length]!());
    }
  });

export default mount;
