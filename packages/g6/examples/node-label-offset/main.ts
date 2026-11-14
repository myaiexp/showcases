// labelOffsetX and labelOffsetY move a label away from its placement
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = { labelOffsetX: 0, labelOffsetY: 0, labelPlacement: 'bottom' as 'bottom' | 'center' | 'right' };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1' }] },
        node: { style: { size: 60, fill: '#5B8FF9', labelText: 'Offset label', labelFill: '#F0F4FF', labelBackground: true, labelBackgroundFill: '#222a45', labelPadding: [2, 6], ...style } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.updateNodeData([{ id: 'node1', style: { ...style } }]);
      await graph.draw();
    };

    if (stage.bar) {
      select(stage.bar, 'labelPlacement', ['bottom', 'center', 'right'] as const, 'bottom', (v) => void apply({ labelPlacement: v }));
      slider(stage.bar, 'labelOffsetX', [-60, 60, 1], 0, (v) => void apply({ labelOffsetX: v }));
      slider(stage.bar, 'labelOffsetY', [-60, 60, 1], 0, (v) => void apply({ labelOffsetY: v }));
    } else {
      // Walk the offset around the node in a square.
      const path = [[0, 0], [50, 0], [50, -50], [-50, -50], [-50, 0]] as const;
      stage.every(900, (i) => {
        const [labelOffsetX, labelOffsetY] = path[i % path.length]!;
        return apply({ labelOffsetX, labelOffsetY });
      });
    }
  });

export default mount;
