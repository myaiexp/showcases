// Combo label background: solid, gradient and stroke-only looks with padding and radius
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const LOOKS = ['solid', 'gradient', 'stroke only'] as const;
type Look = (typeof LOOKS)[number];
const comboOf = (look: Look, radius: number): ComboOptions => {
  const looks: Record<Look, Record<string, unknown>> = {
    solid: { labelText: 'Important Combo', labelFill: '#fff', labelBackgroundFill: '#1783FF', labelBackgroundPadding: [4, 8] },
    gradient: {
      labelText: 'VIP Combo',
      labelFill: '#fff',
      labelFontWeight: 'bold',
      labelBackgroundFill: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
      labelBackgroundPadding: [6, 12],
      labelBackgroundShadowColor: 'rgba(0,0,0,0.4)',
      labelBackgroundShadowBlur: 4,
      labelBackgroundShadowOffsetY: 2,
    },
    'stroke only': {
      labelText: 'Border Label',
      labelFill: '#69B1FF',
      labelBackgroundFill: 'transparent',
      labelBackgroundStroke: '#1783FF',
      labelBackgroundLineWidth: 2,
      labelBackgroundPadding: [4, 8],
    },
  };
  return { style: { padding: 24, labelBackground: true, labelBackgroundRadius: radius, labelPlacement: 'top', fill: '#999', fillOpacity: 0.1, ...looks[look] } };
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let look: Look = 'solid';
    let radius = 4;
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 36, data: single(), combo: comboOf(look, radius) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(look, radius));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'look', LOOKS, look, (v) => ((look = v), void apply()));
      slider(stage.bar, 'labelBackgroundRadius', [0, 30, 1], radius, (v) => ((radius = v), void apply()));
    } else {
      stage.every(1400, (i) => ((look = LOOKS[i % 3]!), (radius = i % 2 ? 20 : 4), apply()));
    }
  });

export default mount;
