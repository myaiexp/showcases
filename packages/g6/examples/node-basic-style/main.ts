// Main-shape style on three node types: fill, stroke, lineWidth, size
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const FILLS = ['#5B8FF9', '#61DDAA', '#F6BD16', '#E86452'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = { fill: '#5B8FF9', stroke: '#1A1A1A', lineWidth: 2, size: 40 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'a', type: 'circle', style: { x: 40, y: 50 } },
            { id: 'b', type: 'rect', style: { x: 140, y: 50 } },
            { id: 'c', type: 'star', style: { x: 240, y: 50 } },
          ],
        },
        // The same style object drives every node; the type only picks the shape.
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
      select(stage.bar, 'fill', FILLS, FILLS[0], (v) => void apply({ fill: v }));
      select(stage.bar, 'stroke', ['#1A1A1A', '#ffffff', '#FF7A45'] as const, '#1A1A1A', (v) => void apply({ stroke: v }));
      slider(stage.bar, 'lineWidth', [0, 12, 1], 2, (v) => void apply({ lineWidth: v }));
      slider(stage.bar, 'size', [16, 80, 1], 40, (v) => void apply({ size: v }));
    } else {
      stage.every(1200, (i) =>
        apply({ fill: FILLS[i % FILLS.length]!, lineWidth: [2, 6, 0, 10][i % 4]!, stroke: i % 2 ? '#ffffff' : '#1A1A1A' }),
      );
    }
  });

export default mount;
