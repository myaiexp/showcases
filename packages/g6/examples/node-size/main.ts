// size as one number or a [width, height] pair on four node types
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'circle', type: 'circle', style: { x: 40, y: 60 } },
            { id: 'rect', type: 'rect', style: { x: 140, y: 60 } },
            { id: 'ellipse', type: 'ellipse', style: { x: 250, y: 60 } },
            { id: 'diamond', type: 'diamond', style: { x: 360, y: 60 } },
          ],
        },
        node: {
          style: { size: [60, 40], fill: '#7e3feb', labelText: (d) => d.id },
        },
      }),
    );
    await graph.render();

    // A number is one side for every shape; a pair is [width, height] (a circle uses the smaller).
    let w = 60;
    let h = 40;
    let pair = true;
    const apply = async (): Promise<void> => {
      graph.setNode({ style: { size: pair ? [w, h] : w, fill: '#7e3feb', labelText: (d) => d.id } });
      await graph.draw();
    };

    if (stage.bar) {
      toggle(stage.bar, 'size as [width, height]', true, (v) => {
        pair = v;
        void apply();
      });
      slider(stage.bar, 'width', [20, 100, 1], w, (v) => ((w = v), void apply()));
      slider(stage.bar, 'height', [20, 100, 1], h, (v) => ((h = v), void apply()));
    } else {
      const steps: [number, number, boolean][] = [[60, 40, true], [40, 70, true], [50, 50, false], [70, 30, true]];
      stage.every(1400, (i) => {
        [w, h, pair] = steps[i % steps.length]!;
        return apply();
      });
    }
  });

export default mount;
