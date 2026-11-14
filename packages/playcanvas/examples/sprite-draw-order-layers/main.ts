// Sprite drawOrder and layers: overlapping sprites sorted manually on a layer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, drawIconGrid, gridFrames } from '../../shared/sprites.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2 });
  const { app, camera } = scene;
  const atlas = createAtlas(scene.stage.device, 256, drawIconGrid, gridFrames(4, 2, 64), 'icons');
  const sprite = createSprite(scene.stage.device, atlas, ['0', '1', '2', '3', '4', '5', '6', '7']);

  // Transparent sprites on the World layer are sorted by distance, and these all sit at z = 0.
  // A layer with manual sorting draws them by drawOrder instead, lowest first.
  const layer = new pc.Layer({ name: 'Sprites', transparentSortMode: pc.SORTMODE_MANUAL });
  app.scene.layers.push(layer);
  camera.camera!.layers = [...camera.camera!.layers, layer.id];

  const frames = [1, 4, 2, 0];
  const sprites = frames.map((frame, i) => {
    const e = addSprite(app, `sprite ${i}`, { type: 'simple', sprite, frame, drawOrder: i, layers: [layer.id] }, [(i - 1.5) * 0.9, 0, 0]);
    e.setLocalScale(2.2, 2.2, 1);
    return e;
  });
  // A fifth sprite on the default World layer, which the camera always renders.
  const world = addSprite(app, 'world layer', { type: 'simple', sprite, frame: 7 }, [0, -1.4, 0]);
  world.setLocalScale(0.8, 0.8, 1);

  const order = [0, 1, 2, 3];
  const apply = (): void => sprites.forEach((e, i) => (e.sprite!.drawOrder = order[i]!));
  apply();

  let t = 0;
  let auto = true;
  app.on('update', (dt: number) => {
    if (!auto) return;
    t += dt;
    // Rotate the draw order through the four sprites so each one takes a turn in front.
    const shift = Math.floor(t / 1.2) % 4;
    for (let i = 0; i < 4; i++) order[i] = (i + shift) % 4;
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    sprites.forEach((_, i) =>
      panel.slider(`drawOrder ${i}`, 0, 10, 1, i, (v) => {
        auto = false;
        order[i] = v;
        apply();
      }),
    );
    panel.row();
    panel.check('camera renders the Sprites layer', true, (on) => {
      const ids = camera.camera!.layers.filter((id) => id !== layer.id);
      camera.camera!.layers = on ? [...ids, layer.id] : ids;
    });
    panel.button('Cycle automatically', () => (auto = true));
  }

  return () => {
    sprite.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
