// padding keeps fitted content away from the canvas edges, as a number or per-side array
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(12, 'n', 120),
        node: { style: { size: 16 } },
        autoFit: { type: 'view', animation: { duration: 500 } },
        // [top, right, bottom, left]
        padding: [10, 10, 10, 10],
      }),
    );
    await graph.render();

    // The canvas background does not show the padding, so a frame is drawn around the graph.
    stage.container.style.outline = '1px dashed #4a5a7a';
    stage.container.style.outlineOffset = '-1px';

    const apply = async (padding: number[]): Promise<void> => {
      graph.setOptions({ padding });
      await graph.render();
    };

    if (stage.bar) {
      const p = [10, 10, 10, 10];
      (['top', 'right', 'bottom', 'left'] as const).forEach((side, k) =>
        slider(stage.bar!, side, [0, 200, 5], 10, (v) => ((p[k] = v), void apply([...p]))),
      );
    } else {
      const steps = [[10, 10, 10, 10], [10, 120, 10, 10], [80, 10, 10, 10], [10, 10, 10, 120]];
      stage.every(1800, (i) => apply(steps[i % steps.length]!));
    }
  });

export default mount;
