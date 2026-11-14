// Palette priority: a style.fill mapping overrides the palette colour on every node
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const options = (override: boolean) => ({
      style: { size: 30, ...(override ? { fill: 'red' } : {}), labelText: (d: { id: string }) => d.id, labelPlacement: 'bottom' as const },
      palette: 'spectral',
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes: Array.from({ length: 8 }, (_, i) => ({ id: `n${i}` })) },
        layout: { type: 'grid', cols: 8 },
        node: options(true),
      }),
    );
    await graph.render();

    // fill wins over the palette; remove it and the palette colours show.
    const setOverride = async (on: boolean): Promise<void> => {
      graph.setNode(options(on));
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, "style: { fill: 'red' }", true, (v) => void setOverride(v));
    else stage.every(1400, (i) => setOverride(i % 2 === 0));
  });

export default mount;
