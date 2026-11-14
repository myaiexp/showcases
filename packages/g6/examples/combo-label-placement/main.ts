// The twelve combo labelPlacement values around a circle combo, plus center
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const PLACEMENTS = [
  'bottom', 'top', 'left', 'right', 'center',
  'top-left', 'top-right', 'bottom-left', 'bottom-right',
  'left-top', 'left-bottom', 'right-top', 'right-bottom',
] as const;
type Placement = (typeof PLACEMENTS)[number];
const comboOf = (p: Placement): ComboOptions => ({
  style: { padding: 20, labelText: p, labelPlacement: p, labelFill: '#FFC53D', labelFontSize: 12, fill: '#1783FF', fillOpacity: 0.15, stroke: '#69B1FF' },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 36, data: single(), combo: comboOf('bottom') }),
    );
    await graph.render();
    const set = async (p: Placement): Promise<void> => {
      graph.setCombo(comboOf(p));
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'labelPlacement', PLACEMENTS, 'bottom', (v) => void set(v));
    else stage.every(800, (i) => set(PLACEMENTS[i % PLACEMENTS.length]!));
  });

export default mount;
