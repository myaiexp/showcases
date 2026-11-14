// A badge styled through its own fields: fill, text, padding, radius, offset
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const badge = {
      text: '99+',
      placement: 'right-top' as const,
      background: true,
      backgroundFill: '#FF4D4F',
      fill: '#fff',
      fontSize: 10,
      padding: [2, 6],
      backgroundRadius: 8,
      offsetX: 0,
      offsetY: 0,
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1' }] },
        node: { style: { size: 50, fill: '#5B8FF9', badges: [badge] } },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof badge>): Promise<void> => {
      Object.assign(badge, patch);
      graph.updateNodeData([{ id: 'node1', style: { badges: [{ ...badge }] } }]);
      await graph.draw();
    };

    if (stage.bar) {
      toggle(stage.bar, 'background', true, (v) => void apply({ background: v }));
      slider(stage.bar, 'fontSize', [6, 20, 1], 10, (v) => void apply({ fontSize: v }));
      slider(stage.bar, 'padding x', [0, 16, 1], 6, (v) => void apply({ padding: [badge.padding[0]!, v] }));
      slider(stage.bar, 'backgroundRadius', [0, 14, 1], 8, (v) => void apply({ backgroundRadius: v }));
      slider(stage.bar, 'offsetX', [-20, 20, 1], 0, (v) => void apply({ offsetX: v }));
      slider(stage.bar, 'offsetY', [-20, 20, 1], 0, (v) => void apply({ offsetY: v }));
    } else {
      const steps: Partial<typeof badge>[] = [
        { text: '12', backgroundFill: '#52C41A', padding: [2, 4], offsetX: -4 },
        { text: 'HOT', backgroundFill: '#FA8C16', padding: [2, 8], backgroundRadius: 3, offsetX: 0 },
        { text: '99+', backgroundFill: '#FF4D4F', padding: [2, 6], backgroundRadius: 8, offsetY: -4 },
      ];
      stage.every(1200, (i) => apply(steps[i % steps.length]!));
    }
  });

export default mount;
