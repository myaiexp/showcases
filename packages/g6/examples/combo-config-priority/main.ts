// Combo style from data, from combo options and from setCombo, with a data-first callback
import { Graph, type ComboData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
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
            { id: 'n1', combo: 'combo-1', style: { x: 80, y: 80 } },
            { id: 'n2', combo: 'combo-2', style: { x: 200, y: 80 } },
          ],
          combos: [
            // combo-1 sets its own stroke and padding in data; combo-2 leaves both to the options.
            { id: 'combo-1', type: 'circle', style: { padding: 30, stroke: 'orange' } },
            { id: 'combo-2' },
          ],
        },
        combo: {
          type: (d: ComboData) => d.type ?? 'rect',
          style: { lineWidth: 3, stroke: (d: ComboData) => String(d.style?.stroke ?? 'royalblue'), labelText: (d) => d.id },
        },
      }),
    );
    await graph.render();
    const set = async (dataWins: boolean): Promise<void> => {
      // setCombo has the highest priority of the three: here a plain stroke beats the data.
      graph.setCombo({
        type: (d: ComboData) => d.type ?? 'rect',
        style: { lineWidth: 3, stroke: dataWins ? (d: ComboData) => String(d.style?.stroke ?? 'royalblue') : 'royalblue', labelText: (d: ComboData) => d.id },
      });
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'data stroke wins', true, (v) => void set(v));
    else stage.every(1600, (i) => set(i % 2 === 1));
  });

export default mount;
