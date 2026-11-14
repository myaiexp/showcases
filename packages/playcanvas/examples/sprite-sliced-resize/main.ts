// Sliced sprite: a 9-slice frame resized by width and height, borders intact
import type { Mount } from '@/types.ts';
import * as pc from 'playcanvas';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, drawPanel, panelFrame } from '../../shared/sprites.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2.6 });
  const { app } = scene;

  // One 64 x 64 frame whose border is 16 px on every side: the corners never stretch.
  const atlas = createAtlas(scene.stage.device, 64, (g) => drawPanel(g), { panel: panelFrame() }, 'panel');
  const sprite = createSprite(scene.stage.device, atlas, ['panel'], { renderMode: pc.SPRITE_RENDERMODE_SLICED, pixelsPerUnit: 64 });

  // In sliced mode the component's width and height (in world units) set the size.
  const panel = addSprite(app, 'panel', { type: 'simple', sprite, width: 3, height: 2 });

  const size = { w: 3, h: 2, auto: true };
  const apply = (): void => {
    panel.sprite!.width = size.w;
    panel.sprite!.height = size.h;
  };

  let t = 0;
  app.on('update', (dt: number) => {
    if (!size.auto) return;
    t += dt;
    size.w = 3.4 + 2.4 * Math.sin(t * 0.9);
    size.h = 2.4 + 1.4 * Math.sin(t * 1.3 + 1);
    apply();
  });

  if (!ctx.preview) {
    const panelUi = createPanel(el);
    const manual = (): void => {
      size.auto = false;
      apply();
    };
    panelUi.slider('width', 0.5, 7, 0.05, 3, (v) => ((size.w = v), manual()));
    panelUi.slider('height', 0.5, 4.5, 0.05, 2, (v) => ((size.h = v), manual()));
    // A border of b pixels is b / pixelsPerUnit units wide.
    panelUi.slider('pixels per unit', 32, 256, 1, 64, (v) => {
      sprite.pixelsPerUnit = v;
    });
    panelUi.button('Animate', () => (size.auto = true));
  }

  return () => {
    sprite.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
