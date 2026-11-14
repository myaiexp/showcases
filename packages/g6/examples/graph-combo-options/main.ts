// The combo option: type, style and a selected state, here with a type selector
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Kind = 'circle' | 'rect';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'a1', combo: 'A', style: { x: 80, y: 80 } },
            { id: 'a2', combo: 'A', style: { x: 140, y: 120 } },
            { id: 'b1', combo: 'B', style: { x: 280, y: 90 } },
            { id: 'b2', combo: 'B', style: { x: 330, y: 150 } },
          ],
          edges: [{ source: 'a2', target: 'b1' }],
          combos: [{ id: 'A' }, { id: 'B' }],
        },
        node: { style: { size: 16 } },
        combo: {
          type: 'circle',
          style: {
            fill: '#f0f0f0',
            fillOpacity: 0.12,
            stroke: '#d9d9d9',
            lineWidth: 1,
            labelText: (d) => `combo ${d.id}`,
          },
          state: { selected: { stroke: '#1890ff', lineWidth: 3 } },
        },
        autoFit: 'view',
        behaviors: ['click-select'],
      }),
    );
    await graph.render();

    const setType = async (type: Kind): Promise<void> => {
      graph.setOptions({ combo: { type } });
      await graph.draw();
    };

    if (stage.bar) select(stage.bar, 'combo.type', ['circle', 'rect'] as const, 'circle', (v) => void setType(v));
    else
      stage.every(1500, (i) => {
        if (i % 2 === 0) void setType(i % 4 === 0 ? 'circle' : 'rect');
        return graph.setElementState({ A: i % 3 === 0 ? 'selected' : [], B: i % 3 === 1 ? 'selected' : [] });
      });
  });

export default mount;
