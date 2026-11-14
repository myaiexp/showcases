// Dashed node borders: lineDash, lineDashOffset, lineCap and lineJoin
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const DASHES = { '6, 4': [6, 4], '2, 6': [2, 6], '12, 4, 2, 4': [12, 4, 2, 4], solid: [] } as const;
type Dash = keyof typeof DASHES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = {
      fill: '#FFF1F0',
      stroke: '#F5222D',
      lineWidth: 3,
      lineDash: [6, 4] as number[],
      lineDashOffset: 0,
      lineCap: 'round' as 'round' | 'square' | 'butt',
      lineJoin: 'miter' as 'round' | 'bevel' | 'miter',
      size: 60,
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        // Updates redraw every 100ms here, so the default update tween would only smear the march.
        animation: false,
        data: {
          nodes: [
            { id: 'a', style: { x: 50, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 140, y: 60 } },
            { id: 'c', type: 'star', style: { x: 230, y: 60 } },
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
      select(stage.bar, 'lineDash', Object.keys(DASHES) as Dash[], '6, 4', (v) => void apply({ lineDash: [...DASHES[v]] }));
      select(stage.bar, 'lineCap', ['round', 'square', 'butt'] as const, 'round', (v) => void apply({ lineCap: v }));
      select(stage.bar, 'lineJoin', ['miter', 'round', 'bevel'] as const, 'miter', (v) => void apply({ lineJoin: v }));
      slider(stage.bar, 'lineWidth', [1, 10, 1], 3, (v) => void apply({ lineWidth: v }));
      slider(stage.bar, 'lineDashOffset', [0, 40, 1], 0, (v) => void apply({ lineDashOffset: v }));
    } else {
      // Stepping lineDashOffset makes the dashes march around the border.
      stage.every(120, (i) => apply({ lineDashOffset: -i * 2 }));
    }
  });

export default mount;
