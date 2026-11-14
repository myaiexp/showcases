// Image icon in the node centre: iconSrc, iconWidth, iconHeight, iconRadius
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { glyph } from '../../shared/images.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = { iconSrc: glyph(0, '#95DE64'), iconWidth: 20, iconHeight: 20, iconRadius: 0 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: {
          nodes: [
            { id: 'a', style: { x: 60, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 160, y: 60 } },
            { id: 'c', type: 'hexagon', style: { x: 260, y: 60 } },
          ],
        },
        node: { style: { size: 50, fill: '#162b12', stroke: '#52C41A', lineWidth: 1.5, ...style } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.setNode({ style: { size: 50, fill: '#162b12', stroke: '#52C41A', lineWidth: 1.5, ...style } });
      await graph.draw();
    };

    if (stage.bar) {
      slider(stage.bar, 'glyph', [0, 4, 1], 0, (v) => void apply({ iconSrc: glyph(v, '#95DE64') }));
      slider(stage.bar, 'iconWidth', [8, 50, 1], 20, (v) => void apply({ iconWidth: v }));
      slider(stage.bar, 'iconHeight', [8, 50, 1], 20, (v) => void apply({ iconHeight: v }));
      slider(stage.bar, 'iconRadius', [0, 25, 1], 0, (v) => void apply({ iconRadius: v }));
    } else {
      stage.every(1000, (i) => apply({ iconSrc: glyph(i, '#95DE64'), iconWidth: 16 + (i % 3) * 6, iconHeight: 16 + (i % 3) * 6 }));
    }
  });

export default mount;
