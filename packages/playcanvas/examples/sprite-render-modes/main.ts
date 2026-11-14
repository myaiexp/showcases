// Sprite render modes side by side: simple, sliced and tiled at the same size
import type { Mount } from '@/types.ts';
import * as pc from 'playcanvas';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, drawPanel, panelFrame } from '../../shared/sprites.ts';

const MODES = [
  ['Simple', pc.SPRITE_RENDERMODE_SIMPLE],
  ['Sliced', pc.SPRITE_RENDERMODE_SLICED],
  ['Tiled', pc.SPRITE_RENDERMODE_TILED],
] as const;

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2.2 });
  const { app } = scene;
  const atlas = createAtlas(scene.stage.device, 64, (g) => drawPanel(g), { panel: panelFrame() }, 'panel');

  // The sprite's renderMode is the only difference between the three entities.
  const sprites = MODES.map(([, mode]) => createSprite(scene.stage.device, atlas, ['panel'], { renderMode: mode }));
  const entities = sprites.map((sprite, i) => {
    // Simple sprites ignore width and height: they draw the whole frame at its own size, scaled.
    return addSprite(app, MODES[i]![0], { type: 'simple', sprite, width: 2, height: 3 }, [(i - 1) * 2.8, 0, 0]);
  });

  const size = { w: 2, h: 3, auto: true };
  let t = 0;
  app.on('update', (dt: number) => {
    if (size.auto) {
      t += dt;
      size.w = 2 + 0.6 * Math.sin(t);
      size.h = 2.6 + 0.9 * Math.sin(t * 0.7);
    }
    entities.forEach((e, i) => {
      if (i === 0) e.setLocalScale(size.w, size.h, 1);
      else {
        e.sprite!.width = size.w;
        e.sprite!.height = size.h;
      }
    });
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('width', 0.8, 2.6, 0.05, 2, (v) => ((size.auto = false), (size.w = v)));
    panel.slider('height', 0.8, 3.6, 0.05, 3, (v) => ((size.auto = false), (size.h = v)));
    panel.button('Animate', () => (size.auto = true));
    panel.readout('Simple, Sliced, Tiled. The simple sprite is scaled by its entity; the others by width and height.');
  }

  return () => {
    sprites.forEach((s) => s.destroy());
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
