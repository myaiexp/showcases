// Combo badges: one badge at the default spot, then several with placements and a palette
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const VARIANTS = ['single', 'multiple'] as const;
type Variant = (typeof VARIANTS)[number];
const comboOf = (v: Variant): ComboOptions => ({
  style: {
    padding: 24,
    fill: '#1783FF',
    fillOpacity: 0.12,
    badge: true,
    badges: v === 'single' ? [{ text: 'NEW' }] : [
      { text: 'A', placement: 'right-top' },
      { text: 'Important', placement: 'right' },
      { text: 'Notice', placement: 'right-bottom' },
    ],
    badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'],
    badgeFontSize: 8,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 50, data: single(), combo: comboOf('single') }),
    );
    await graph.render();
    const set = async (v: Variant): Promise<void> => {
      graph.setCombo(comboOf(v));
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'badges', VARIANTS, 'single', (v) => void set(v));
    else stage.every(1500, (i) => set(VARIANTS[i % 2]!));
  });

export default mount;
