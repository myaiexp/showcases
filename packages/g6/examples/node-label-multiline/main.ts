// Multi-line labels: labelLineHeight, labelLeading and labelTextAlign
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = { labelLineHeight: 14, labelLeading: 0, labelTextAlign: 'center' as 'left' | 'center' | 'right' };
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
            // \n breaks the line; labelMaxLines must allow more than the default 1.
            labelText: 'first line\nsecond, longer line\nthird',
            labelMaxLines: 4,
            labelFill: '#F0F4FF',
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
      slider(stage.bar, 'labelLineHeight', [8, 40, 1], 14, (v) => void apply({ labelLineHeight: v }));
      slider(stage.bar, 'labelLeading', [0, 20, 1], 0, (v) => void apply({ labelLeading: v }));
      select(stage.bar, 'labelTextAlign', ['left', 'center', 'right'] as const, 'center', (v) => void apply({ labelTextAlign: v }));
    } else {
      const steps: Partial<typeof style>[] = [
        { labelLeading: 0, labelTextAlign: 'center' },
        { labelLeading: 10, labelTextAlign: 'left' },
        { labelLineHeight: 24, labelLeading: 0, labelTextAlign: 'right' },
        { labelLineHeight: 14, labelLeading: 4, labelTextAlign: 'center' },
      ];
      stage.every(1300, (i) => apply(steps[i % steps.length]!));
    }
  });

export default mount;
