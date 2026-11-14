// combo.type as a function of the combo datum: circle or rect per combo
import { Graph, type ComboData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          nodes: [
            { id: 'n1', combo: 'c1', style: { x: 70, y: 90 } },
            { id: 'n2', combo: 'c1', style: { x: 110, y: 110 } },
            { id: 'n3', combo: 'c2', style: { x: 200, y: 90 } },
            { id: 'n4', combo: 'c2', style: { x: 240, y: 110 } },
          ],
          combos: [
            { id: 'c1', data: { comboType: 'circle' } },
            { id: 'c2', data: { comboType: 'rect' } },
          ],
        },
        combo: {
          type: (d: ComboData) => String(d.data?.comboType ?? 'circle'),
          style: { labelText: (d) => `${d.id}: ${d.data?.comboType}` },
        },
      }),
    );
    await graph.render();
    const set = async (t: string): Promise<void> => {
      graph.updateComboData([{ id: 'c2', data: { comboType: t } }]);
      await graph.draw();
    };
    const types = ['rect', 'circle'] as const;
    if (stage.bar) select(stage.bar, "c2's data.comboType", types, 'rect', (v) => void set(v));
    else stage.every(1500, (i) => set(types[i % 2]!));
  });

export default mount;
