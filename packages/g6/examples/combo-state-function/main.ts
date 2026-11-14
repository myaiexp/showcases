// combo.state entries as functions of the combo datum, so a VIP combo reacts differently
import { Graph, type ComboData, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'n1', combo: 'vip', style: { x: 70, y: 90 } },
            { id: 'n2', combo: 'plain', style: { x: 210, y: 90 } },
          ],
          combos: [
            { id: 'vip', data: { isVIP: true, level: 5 } },
            { id: 'plain', data: { isVIP: false, level: 1 } },
          ],
        },
        combo: {
          style: { padding: 20, cursor: 'pointer', labelText: (d) => `${d.id} (level ${d.data?.level})` },
          state: {
            // Each function runs per combo, so the same state looks different on each.
            hover: (d: ComboData) => ({ fill: d.data?.isVIP ? '#FFD700' : '#1783FF', fillOpacity: 0.3 }),
            active: (d: ComboData) => ({ stroke: Number(d.data?.level) > 3 ? '#FF4D4F' : '#52C41A', lineWidth: 4 }),
          },
        },
      }),
    );
    await graph.render();
    if (stage.bar) {
      graph.on('combo:pointerenter', (e: IElementEvent) => void graph.setElementState(e.target.id, ['hover', 'active']));
      graph.on('combo:pointerleave', (e: IElementEvent) => void graph.setElementState(e.target.id, []));
    } else {
      stage.every(1000, (i) => graph.setElementState({ vip: i % 2 ? [] : ['hover', 'active'], plain: i % 2 ? ['hover', 'active'] : [] }));
    }
  });

export default mount;
