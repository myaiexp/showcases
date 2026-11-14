// Long labels: labelWordWrap, labelMaxWidth, labelMaxLines, text overflow
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = {
      labelWordWrap: true,
      labelMaxWidth: '150%' as string | number,
      labelMaxLines: 3,
      labelTextOverflow: 'ellipsis',
      labelTextAlign: 'center' as 'left' | 'center' | 'right',
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1' }] },
        node: {
          style: {
            size: 50,
            fill: '#5B8FF9',
            labelText: 'This is a very long node name that needs line wrapping',
            labelFill: '#d9e2ff',
            labelPlacement: 'bottom',
            ...style,
          },
        },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.updateNodeData([{ id: 'node1', style: { ...style } }]);
      await graph.draw();
    };

    if (stage.bar) {
      toggle(stage.bar, 'labelWordWrap', true, (v) => void apply({ labelWordWrap: v }));
      slider(stage.bar, 'labelMaxWidth (px)', [40, 300, 5], 75, (v) => void apply({ labelMaxWidth: v }));
      slider(stage.bar, 'labelMaxLines', [1, 6, 1], 3, (v) => void apply({ labelMaxLines: v }));
      select(stage.bar, 'labelTextAlign', ['left', 'center', 'right'] as const, 'center', (v) => void apply({ labelTextAlign: v }));
    } else {
      const widths = ['150%', 120, 60, '300%'];
      stage.every(1400, (i) => apply({ labelMaxWidth: widths[i % 4]!, labelMaxLines: [3, 2, 4, 1][i % 4]! }));
    }
  });

export default mount;
