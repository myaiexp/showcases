// getLayout() returns the layout configuration after every setLayout
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ringGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: ringGraph(14, 4),
        node: { style: { size: 16 } },
        layout: { type: 'grid', cols: 5 },
        behaviors: ['drag-canvas', 'zoom-canvas'],
      }),
    );
    await graph.render();

    const options = [
      { type: 'grid', cols: 5 },
      { type: 'circular', radius: 90 },
      { type: 'concentric', preventOverlap: true, nodeSize: 16 },
    ];
    let next = 1;
    const out = stage.bar ? readout(el) : null;
    const show = (): void => {
      if (out) out.textContent = `graph.getLayout() = ${JSON.stringify(graph.getLayout())}`;
    };
    show();

    const step = async (): Promise<void> => {
      graph.setLayout(options[next % options.length]!);
      next++;
      show();
      await graph.layout();
    };

    if (stage.bar) button(stage.bar, 'setLayout(next) + layout()', step);
    else stage.every(2200, step);
  });

export default mount;
