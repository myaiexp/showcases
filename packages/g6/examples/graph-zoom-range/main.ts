// zoomRange clamps every zoom, whether from the wheel or from zoomTo()
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const range: [number, number] = [0.5, 2];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(10, 'n', 80),
        node: { style: { size: 20 } },
        autoFit: 'center',
        zoomRange: range,
        behaviors: ['zoom-canvas', 'drag-canvas'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `zoom ${graph.getZoom().toFixed(2)}   zoomRange [${range.join(', ')}]   (scroll to zoom)`;
      };
      graph.on(GraphEvent.AFTER_TRANSFORM, show);
      show();
      // Narrowing the range does not move the current zoom; the next zoom is clamped to it.
      const apply = (): void => {
        graph.setOptions({ zoomRange: [...range] });
        show();
      };
      slider(stage.bar, 'min', [0.1, 1, 0.05], range[0], (v) => ((range[0] = v), apply()));
      slider(stage.bar, 'max', [1, 5, 0.1], range[1], (v) => ((range[1] = v), apply()));
    } else {
      // Asks for 0.2, 1, 5 in turn; the graph stops at 0.5 and 2.
      const asks = [0.2, 1, 5];
      stage.every(1500, (i) => graph.zoomTo(asks[i % 3]!, { duration: 700 }));
    }
  });

export default mount;
