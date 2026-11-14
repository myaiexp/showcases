// Label background: fill, radius, padding, border, dash and shadow
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = {
      labelBackground: true,
      labelBackgroundFill: 'rgba(250, 140, 22, 0.25)',
      labelBackgroundRadius: 6,
      labelPadding: [6, 12] as number[],
      labelBackgroundStroke: '#FA8C16',
      labelBackgroundLineWidth: 1,
      labelBackgroundLineDash: [] as number[],
      labelBackgroundShadowBlur: 0,
      labelBackgroundShadowColor: '#FA8C16',
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1' }] },
        node: {
          style: {
            size: 40,
            fill: '#5B8FF9',
            labelText: 'Important Node',
            labelFill: '#FFD591',
            labelFontWeight: 'bold',
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
      toggle(stage.bar, 'labelBackground', true, (v) => void apply({ labelBackground: v }));
      slider(stage.bar, 'labelBackgroundRadius', [0, 20, 1], 6, (v) => void apply({ labelBackgroundRadius: v }));
      slider(stage.bar, 'padding y', [0, 20, 1], 6, (v) => void apply({ labelPadding: [v, style.labelPadding[1]!] }));
      slider(stage.bar, 'padding x', [0, 30, 1], 12, (v) => void apply({ labelPadding: [style.labelPadding[0]!, v] }));
      slider(stage.bar, 'labelBackgroundLineWidth', [0, 6, 1], 1, (v) => void apply({ labelBackgroundLineWidth: v }));
      toggle(stage.bar, 'dashed border', false, (v) => void apply({ labelBackgroundLineDash: v ? [4, 3] : [] }));
      slider(stage.bar, 'shadowBlur', [0, 20, 1], 0, (v) => void apply({ labelBackgroundShadowBlur: v }));
    } else {
      const steps: Partial<typeof style>[] = [
        { labelBackgroundRadius: 14, labelPadding: [4, 16] },
        { labelBackgroundRadius: 0, labelPadding: [8, 8], labelBackgroundLineDash: [4, 3] },
        { labelBackgroundRadius: 6, labelPadding: [6, 12], labelBackgroundLineDash: [], labelBackgroundShadowBlur: 12 },
        { labelBackground: false },
      ];
      stage.every(1200, (i) => apply({ labelBackground: true, labelBackgroundShadowBlur: 0, ...steps[i % steps.length]! }));
    }
  });

export default mount;
