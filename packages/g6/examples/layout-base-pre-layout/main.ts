// preLayout runs the layout before elements are created: probe node 0 when drawing starts
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ringGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let graph: Graph | null = null;
    let pre = true;
    const out = stage.bar ? readout(el) : null;

    // preLayout only applies to the first draw, so each try builds a new graph.
    const build = async (preLayout: boolean): Promise<void> => {
      graph?.destroy();
      const g = stage.keep(
        new Graph({
          container: stage.container,
          theme: 'dark',
          autoFit: 'view',
          padding: 20,
          data: ringGraph(18, 5),
          node: { style: { size: 16 } },
          layout: { type: 'circular', preLayout },
          behaviors: ['drag-canvas', 'zoom-canvas'],
        }),
      );
      graph = g;
      g.on(GraphEvent.BEFORE_DRAW, () => {
        const style = g.getNodeData('n0').style;
        if (out) out.textContent = `preLayout: ${preLayout}\nn0 when drawing starts: x = ${style?.x ?? 'unset'}, y = ${style?.y ?? 'unset'}`;
      });
      await g.render();
    };
    await build(pre);

    if (stage.bar) {
      toggle(stage.bar, 'preLayout', true, (v) => {
        pre = v;
      });
      button(stage.bar, 'rebuild graph', () => build(pre));
    } else {
      stage.every(3200, (i) => build(i % 2 === 0));
    }
  });

export default mount;
