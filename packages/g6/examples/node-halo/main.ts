// Halo ring around a node: halo, haloStroke, haloLineWidth, haloStrokeOpacity
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = {
      halo: true,
      haloStroke: '#1890FF',
      haloLineWidth: 6,
      haloStrokeOpacity: 0.3,
      haloLineDash: [] as number[],
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'a', style: { x: 50, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 150, y: 60 } },
            { id: 'c', type: 'star', style: { x: 250, y: 60 } },
          ],
        },
        node: { style: { size: 40, fill: '#2a3550', lineWidth: 1.5, stroke: '#1890FF', ...style } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.setNode({ style: { size: 40, fill: '#2a3550', lineWidth: 1.5, stroke: '#1890FF', ...style } });
      await graph.draw();
    };

    if (stage.bar) {
      toggle(stage.bar, 'halo', true, (v) => void apply({ halo: v }));
      select(stage.bar, 'haloStroke', ['#1890FF', '#F5222D', '#52C41A', '#FAAD14'] as const, '#1890FF', (v) => void apply({ haloStroke: v }));
      slider(stage.bar, 'haloLineWidth', [1, 30, 1], 6, (v) => void apply({ haloLineWidth: v }));
      slider(stage.bar, 'haloStrokeOpacity', [0, 1, 0.05], 0.3, (v) => void apply({ haloStrokeOpacity: v }));
      toggle(stage.bar, 'dashed halo', false, (v) => void apply({ haloLineDash: v ? [4, 4] : [] }));
    } else {
      // A pulse: the halo widens and fades, then starts over.
      stage.every(450, (i) => apply({ haloLineWidth: 4 + (i % 5) * 4, haloStrokeOpacity: 0.5 - (i % 5) * 0.08 }));
    }
  });

export default mount;
