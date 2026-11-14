// Combo icon from an image: iconSrc with iconWidth and iconHeight
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { glyph } from '../../shared/images.ts';
import { mountGraph } from '../../shared/graph.ts';

const comboOf = (i: number, px: number): ComboOptions => ({
  // The docs load an SVG from a CDN; a generated data URL stands in so nothing is fetched.
  style: { fill: '#1890FF', fillOpacity: 0.4, iconSrc: glyph(i), iconWidth: px, iconHeight: px },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let px = 32;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { combos: [{ id: 'combo1', style: { x: 140, y: 90, collapsedSize: 90 } }] },
        combo: comboOf(0, px),
      }),
    );
    await graph.render();
    const set = async (i: number, v: number): Promise<void> => {
      px = v;
      graph.setCombo(comboOf(i, v));
      await graph.draw();
    };
    if (stage.bar) slider(stage.bar, 'iconWidth / iconHeight', [8, 80, 1], px, (v) => void set(0, v));
    else stage.every(1200, (i) => set(i, [32, 56, 20][i % 3]!));
  });

export default mount;
