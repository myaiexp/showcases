// Hidden nodes join a pre-layout only when isLayoutInvisibleNodes is true
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let graph: Graph | null = null;

    // Pre-layout happens once before the first draw, so each setting needs a fresh graph.
    const build = async (isLayoutInvisibleNodes: boolean): Promise<void> => {
      graph?.destroy();
      const g = stage.keep(
        new Graph({
          container: stage.container,
          theme: 'dark',
          autoFit: 'view',
          padding: 24,
          data: {
            nodes: Array.from({ length: 16 }, (_, i) => ({
              id: `n${i}`,
              style: { visibility: i % 4 === 1 ? ('hidden' as const) : ('visible' as const) },
            })),
          },
          node: { style: { size: 18, labelText: (d) => d.id, labelPlacement: 'center', labelFill: '#fff', labelFontSize: 9 } },
          layout: { type: 'circular', preLayout: true, isLayoutInvisibleNodes },
          behaviors: ['drag-canvas', 'zoom-canvas'],
        }),
      );
      graph = g;
      await g.render();
    };
    await build(false);

    if (stage.bar) toggle(stage.bar, 'isLayoutInvisibleNodes', false, (v) => build(v));
    else stage.every(2800, (i) => build(i % 2 === 1));
  });

export default mount;
