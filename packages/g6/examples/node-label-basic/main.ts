// Node label: labelText, labelFill, labelFontSize and labelPlacement
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const PLACEMENTS = ['bottom', 'top', 'left', 'right', 'center', 'left-top', 'right-bottom'] as const;
type Placement = (typeof PLACEMENTS)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = { label: true, labelText: 'Node Name', labelFill: '#d9e2ff', labelFontSize: 12, labelPlacement: 'bottom' as Placement };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1' }] },
        node: { style: { size: 50, fill: '#5B8FF9', ...style } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.updateNodeData([{ id: 'node1', style: { ...style } }]);
      await graph.draw();
    };

    if (stage.bar) {
      toggle(stage.bar, 'label', true, (v) => void apply({ label: v }));
      select(stage.bar, 'labelPlacement', PLACEMENTS, 'bottom', (v) => void apply({ labelPlacement: v }));
      slider(stage.bar, 'labelFontSize', [8, 32, 1], 12, (v) => void apply({ labelFontSize: v }));
      select(stage.bar, 'labelFill', ['#d9e2ff', '#FF7A45', '#61DDAA'] as const, '#d9e2ff', (v) => void apply({ labelFill: v }));
    } else {
      stage.every(1000, (i) => apply({ labelPlacement: PLACEMENTS[i % PLACEMENTS.length]!, labelFontSize: 12 + (i % 3) * 3 }));
    }
  });

export default mount;
