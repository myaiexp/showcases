// Text icon in the node centre: iconText, iconFill, iconFontSize, weight
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = { iconText: 'A', iconFill: '#FFADD2', iconFontSize: 16, iconFontWeight: 'bold' as 'normal' | 'bold' };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: {
          nodes: [
            { id: 'a', style: { x: 60, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 160, y: 60 } },
            { id: 'c', type: 'diamond', style: { x: 260, y: 60 } },
          ],
        },
        // The docs' third variant loads an iconfont stylesheet; plain text needs none.
        node: { style: { size: 50, fill: '#3b1229', stroke: '#EB2F96', lineWidth: 1.5, ...style } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.setNode({ style: { size: 50, fill: '#3b1229', stroke: '#EB2F96', lineWidth: 1.5, ...style } });
      await graph.draw();
    };

    if (stage.bar) {
      select(stage.bar, 'iconText', ['A', 'B', '42', 'OK', '?'] as const, 'A', (v) => void apply({ iconText: v }));
      select(stage.bar, 'iconFill', ['#FFADD2', '#ffffff', '#95DE64'] as const, '#FFADD2', (v) => void apply({ iconFill: v }));
      slider(stage.bar, 'iconFontSize', [8, 36, 1], 16, (v) => void apply({ iconFontSize: v }));
      select(stage.bar, 'iconFontWeight', ['bold', 'normal'] as const, 'bold', (v) => void apply({ iconFontWeight: v }));
    } else {
      const texts = ['A', 'B', '42', 'OK'];
      stage.every(1000, (i) => apply({ iconText: texts[i % 4]!, iconFontSize: 14 + (i % 3) * 5 }));
    }
  });

export default mount;
