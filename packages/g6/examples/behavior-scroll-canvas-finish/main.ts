// scroll-canvas onFinish and preventDefault: a callback per scroll, and page scrolling kept apart
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay, simWheel } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Scroll over the graph; onFinish fires once the scrolling stops.';
    const say = stage.preview ? overlay(stage) : null;
    let finished = 0;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(7, 5, 55),
        node: { style: { size: 16 } },
        behaviors: [
          {
            type: 'scroll-canvas',
            key: 'scroll',
            onFinish: () => {
              finished += 1;
              log?.replaceChildren(`onFinish: scroll #${finished} finished`);
              say?.(`onFinish: scroll #${finished}`);
            },
          },
        ],
        plugins: [{ type: 'grid-line', size: 30 }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      toggle(stage.bar, 'preventDefault', true, (preventDefault) => graph.updateBehavior({ key: 'scroll', preventDefault }));
    } else {
      stage.every(300, (i) => simWheel(graph, [130, 100], i % 14 < 5 ? 50 : 0, 0));
    }
  });

export default mount;
