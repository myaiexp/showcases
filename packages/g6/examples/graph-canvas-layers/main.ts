// canvas.enableMultiLayer: four stacked canvases by default, one when turned off
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rebuildable, ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let multi = true;
    // Only read when the canvas is created, so the graph is rebuilt on each change.
    const live = rebuildable(
      stage,
      () =>
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: ring(8, 'n', 70),
          node: { style: { size: 22, labelText: (d) => d.id } },
          autoFit: 'center',
          canvas: { enableMultiLayer: multi },
        }),
    );
    await live.rebuild();

    const out = stage.bar ? readout(el) : null;
    const show = (): void => {
      if (out) out.textContent = `enableMultiLayer: ${multi}  ->  ${stage.container.querySelectorAll('canvas').length} <canvas> element(s) in the container`;
    };
    if (stage.bar) {
      toggle(stage.bar, 'enableMultiLayer', multi, (v) => ((multi = v), void live.rebuild().then(show)));
      show();
    } else {
      stage.every(1800, (i) => ((multi = i % 2 === 0), live.rebuild()));
    }
  });

export default mount;
