// Four directional ports: port, ports, portR, portStroke and per-port fill
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style = { port: true, portR: 3, portLineWidth: 1, portStroke: '#fff' };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'a', style: { x: 60, y: 60 } },
            { id: 'b', type: 'rect', style: { x: 180, y: 60 } },
            { id: 'c', type: 'diamond', style: { x: 300, y: 60 } },
          ],
        },
        node: {
          style: {
            size: 50,
            fill: '#2a3550',
            stroke: '#5B8FF9',
            ports: [
              { key: 'top', placement: 'top', fill: '#7E92B5' },
              { key: 'right', placement: 'right', fill: '#F4664A' },
              { key: 'bottom', placement: 'bottom', fill: '#FFBE3A' },
              { key: 'left', placement: 'left', fill: '#D580FF' },
            ],
            ...style,
          },
        },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.updateNodeData(['a', 'b', 'c'].map((id) => ({ id, style: { ...style } })));
      await graph.draw();
    };

    if (stage.bar) {
      toggle(stage.bar, 'port', true, (v) => void apply({ port: v }));
      slider(stage.bar, 'portR', [1, 12, 1], 3, (v) => void apply({ portR: v }));
      slider(stage.bar, 'portLineWidth', [0, 5, 1], 1, (v) => void apply({ portLineWidth: v }));
    } else {
      stage.every(900, (i) => apply({ portR: [3, 6, 9, 4][i % 4]!, portLineWidth: 1 + (i % 3) }));
    }
  });

export default mount;
