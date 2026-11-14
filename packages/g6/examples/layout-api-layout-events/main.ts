// Listen to BEFORE_LAYOUT / AFTER_LAYOUT and pass options straight to layout()
import { Graph, GraphEvent } from '@antv/g6';
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
        data: ringGraph(15, 5),
        node: { style: { size: 16 } },
        layout: { type: 'circular' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );

    const out = stage.bar ? readout(el) : null;
    const lines: string[] = [];
    const log = (line: string): void => {
      lines.push(line);
      if (out) out.textContent = lines.slice(-6).join('\n');
    };
    graph.on(GraphEvent.BEFORE_LAYOUT, () => log('BEFORE_LAYOUT'));
    graph.on(GraphEvent.AFTER_LAYOUT, () => log('AFTER_LAYOUT'));
    await graph.render();

    // layout(options) wins over the options the graph holds, without storing them.
    const types = ['grid', 'concentric', 'radial', 'circular'];
    let n = 0;
    const run = async (): Promise<void> => {
      const type = types[n++ % types.length]!;
      log(`layout({ type: '${type}' })`);
      await graph.layout({ type });
      await graph.fitView();
    };

    if (stage.bar) {
      button(stage.bar, 'layout({ type: next })', run);
      button(stage.bar, 'layout()', async () => {
        log('layout()');
        await graph.layout();
      });
    } else {
      stage.every(2000, run);
    }
  });

export default mount;
