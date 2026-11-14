// Image element sprites: sliced and tiled frames whose borders keep their size
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createAtlas, createSprite, drawPanel, panelFrame } from '../../shared/sprites.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // One 64 x 64 frame with 16 px borders. With 1 pixel per unit a border is 16 screen units wide.
  const atlas = createAtlas(ui.stage.device, 64, (g) => drawPanel(g), { panel: panelFrame() }, 'panel');
  const sliced = createSprite(ui.stage.device, atlas, ['panel'], { pixelsPerUnit: 1, renderMode: pc.SPRITE_RENDERMODE_SLICED });
  const tiled = createSprite(ui.stage.device, atlas, ['panel'], { pixelsPerUnit: 1, renderMode: pc.SPRITE_RENDERMODE_TILED });

  const make = (name: string, sprite: pc.Sprite, y: number): pc.Entity => {
    addText(ui, ui.screen, name, { fontSize: 22, color: color(COL.dim), anchor: [0, 0.5, 0, 0.5], pivot: [0, 0.5] }, [24, y]);
    return addElement(ui.screen, name, { width: 300, height: 130, sprite }, [100, y]);
  };
  const a = make('Sliced', sliced, 85);
  const b = make('Tiled', tiled, -85);

  const state = { w: 300, h: 130, ppu: 1, auto: true };
  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (state.auto) {
      t += dt;
      state.w = 280 + 120 * Math.sin(t);
      state.h = 120 + 30 * Math.sin(t * 1.4);
    }
    for (const e of [a, b]) {
      e.element!.width = state.w;
      e.element!.height = state.h;
      e.element!.pixelsPerUnit = state.ppu;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('width', 60, 440, 1, 300, (v) => ((state.auto = false), (state.w = v)));
    panel.slider('height', 40, 160, 1, 130, (v) => ((state.auto = false), (state.h = v)));
    panel.slider('pixels per unit', 0.5, 3, 0.1, 1, (v) => (state.ppu = v));
    panel.button('Animate', () => (state.auto = true));
  }

  return () => {
    sliced.destroy();
    tiled.destroy();
    atlas.destroy();
    ui.dispose();
  };
};

export default mount;
