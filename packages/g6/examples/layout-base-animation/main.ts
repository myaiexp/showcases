// BaseLayout.animation on and off, alternating a grid and a circle
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, ringGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'grid', animation: true };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: ringGraph(20, 6),
        node: { style: { size: 16 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    let grid = false;
    const flip = (patch: Record<string, unknown> = {}): Promise<void> => {
      grid = !grid;
      return relayout(graph, layout, { type: grid ? 'circular' : 'grid', ...patch });
    };

    if (stage.bar) {
      toggle(stage.bar, 'animation', true, (animation) => Object.assign(layout, { animation }));
      button(stage.bar, 'switch grid / circular', () => flip());
    } else {
      stage.every(2200, (i) => flip({ animation: i % 4 < 2 }));
    }
  });

export default mount;
