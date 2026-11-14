// The two built-in combo types, circle and rect, over the same nodes
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Kind = 'circle' | 'rect';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const nodes = [
      { id: 'a1', combo: 'A', style: { x: 60, y: 60 } },
      { id: 'a2', combo: 'A', style: { x: 130, y: 100 } },
      { id: 'a3', combo: 'A', style: { x: 70, y: 140 } },
      { id: 'b1', combo: 'B', style: { x: 300, y: 70 } },
      { id: 'b2', combo: 'B', style: { x: 360, y: 130 } },
    ];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes, combos: [{ id: 'A' }, { id: 'B', type: 'rect' }] },
        node: { style: { size: 16 } },
        // Combo B names its own type in the data; combo A takes the option's type.
        combo: { type: 'circle', style: { labelText: (d) => `${d.id}: ${d.type ?? 'default'}` } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    const setType = async (type: Kind): Promise<void> => {
      graph.setOptions({ combo: { type } });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'combo.type', ['circle', 'rect'] as const, 'circle', (v) => void setType(v));
    else stage.every(1800, (i) => setType(i % 2 ? 'circle' : 'rect'));
  });

export default mount;
