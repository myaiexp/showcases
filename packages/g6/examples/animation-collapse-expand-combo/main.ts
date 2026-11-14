// collapse and expand animation stages on a combo: preset, a custom paradigm or off
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Stage = string | false | { fields: string[]; duration: number }[];
const MODES: Record<'combo-collapse / combo-expand' | 'custom: x, y, r over 1500 ms' | 'off', { collapse: Stage; expand: Stage }> = {
  'combo-collapse / combo-expand': { collapse: 'combo-collapse', expand: 'combo-expand' },
  'custom: x, y, r over 1500 ms': { collapse: [{ fields: ['x', 'y', 'r'], duration: 1500 }], expand: [{ fields: ['x', 'y', 'r'], duration: 1500 }] },
  off: { collapse: false, expand: false },
};
type Mode = keyof typeof MODES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const combo = (m: Mode) => ({ type: 'circle', style: { labelText: 'combo', collapsedSize: 24, fill: '#5B8FF9', fillOpacity: 0.15, stroke: '#5B8FF9' }, animation: MODES[m] });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'a', combo: 'c1', style: { x: 90, y: 70 } },
            { id: 'b', combo: 'c1', style: { x: 150, y: 110 } },
            { id: 'c', combo: 'c1', style: { x: 90, y: 130 } },
            { id: 'd', style: { x: 250, y: 100 } },
          ],
          edges: [
            { source: 'b', target: 'd' },
            { source: 'a', target: 'c' },
          ],
          combos: [{ id: 'c1' }],
        },
        node: { style: { size: 20, fill: '#F6BD16' } },
        combo: combo('combo-collapse / combo-expand'),
      }),
    );
    await graph.render();

    let mode: Mode = 'combo-collapse / combo-expand';
    let collapsed = false;
    const flip = async (): Promise<void> => {
      collapsed = !collapsed;
      graph.setCombo(combo(mode));
      await (collapsed ? graph.collapseElement('c1') : graph.expandElement('c1'));
    };
    if (stage.bar) {
      select(stage.bar, 'collapse / expand animation', Object.keys(MODES) as Mode[], mode, (v) => (mode = v));
      button(stage.bar, 'toggle collapse', () => void flip());
    } else stage.every(1800, flip);
  });

export default mount;
