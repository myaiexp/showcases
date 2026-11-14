// Fill opacity and shadow (blur, offset, inner or outer) on a node
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = {
      fill: '#61DDAA',
      fillOpacity: 0.85,
      shadowColor: 'rgba(97, 221, 170, 0.9)',
      shadowBlur: 12,
      shadowOffsetX: 2,
      shadowOffsetY: 4,
      shadowType: 'outer' as 'outer' | 'inner',
      stroke: '#F0F0F0',
      lineWidth: 1,
      size: 60,
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'a', style: { x: 60, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 180, y: 60 } },
          ],
        },
        node: { style: { ...style } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.setNode({ style: { ...style } });
      await graph.draw();
    };

    if (stage.bar) {
      slider(stage.bar, 'fillOpacity', [0, 1, 0.05], 0.85, (v) => void apply({ fillOpacity: v }));
      slider(stage.bar, 'shadowBlur', [0, 40, 1], 12, (v) => void apply({ shadowBlur: v }));
      slider(stage.bar, 'shadowOffsetX', [-20, 20, 1], 2, (v) => void apply({ shadowOffsetX: v }));
      slider(stage.bar, 'shadowOffsetY', [-20, 20, 1], 4, (v) => void apply({ shadowOffsetY: v }));
      select(stage.bar, 'shadowType', ['outer', 'inner'] as const, 'outer', (v) => void apply({ shadowType: v }));
    } else {
      stage.every(1100, (i) =>
        apply({ shadowBlur: [4, 24, 40][i % 3]!, shadowOffsetX: [2, -8, 10][i % 3]!, fillOpacity: [0.85, 0.4, 1][i % 3]!, shadowType: i % 4 === 3 ? 'inner' : 'outer' }),
      );
    }
  });

export default mount;
