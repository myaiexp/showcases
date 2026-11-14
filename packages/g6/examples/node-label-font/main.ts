// Label font: family, weight, style, letter spacing and underline
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = {
      labelFontFamily: 'sans-serif',
      labelFontSize: 16,
      labelFontWeight: 'bold' as 'normal' | 'bold' | 'lighter',
      labelFontStyle: 'normal' as 'normal' | 'italic',
      labelLetterSpacing: 0,
      labelTextDecorationLine: 'none',
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1' }] },
        node: { style: { size: 40, fill: '#5B8FF9', labelText: 'Typeset label', labelFill: '#F0F4FF', labelPlacement: 'bottom', ...style } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.updateNodeData([{ id: 'node1', style: { ...style } }]);
      await graph.draw();
    };

    if (stage.bar) {
      select(stage.bar, 'labelFontFamily', ['sans-serif', 'serif', 'monospace', 'cursive'] as const, 'sans-serif', (v) => void apply({ labelFontFamily: v }));
      select(stage.bar, 'labelFontWeight', ['lighter', 'normal', 'bold'] as const, 'bold', (v) => void apply({ labelFontWeight: v }));
      toggle(stage.bar, 'italic', false, (v) => void apply({ labelFontStyle: v ? 'italic' : 'normal' }));
      toggle(stage.bar, 'underline', false, (v) => void apply({ labelTextDecorationLine: v ? 'underline' : 'none' }));
      slider(stage.bar, 'labelFontSize', [8, 36, 1], 16, (v) => void apply({ labelFontSize: v }));
      slider(stage.bar, 'labelLetterSpacing', [0, 10, 0.5], 0, (v) => void apply({ labelLetterSpacing: v }));
    } else {
      const looks: Partial<typeof style>[] = [
        { labelFontFamily: 'serif', labelFontStyle: 'italic', labelLetterSpacing: 0 },
        { labelFontFamily: 'monospace', labelFontStyle: 'normal', labelLetterSpacing: 4, labelTextDecorationLine: 'none' },
        { labelFontFamily: 'sans-serif', labelFontWeight: 'lighter', labelTextDecorationLine: 'underline', labelLetterSpacing: 1 },
        { labelFontFamily: 'sans-serif', labelFontWeight: 'bold', labelTextDecorationLine: 'none', labelLetterSpacing: 0 },
      ];
      stage.every(1200, (i) => apply(looks[i % looks.length]!));
    }
  });

export default mount;
