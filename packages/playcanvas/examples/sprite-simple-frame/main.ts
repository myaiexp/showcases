// Simple sprite component: one atlas frame shown at a time, chosen by index
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, drawIconGrid, gridFrames } from '../../shared/sprites.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx);
  const { app } = scene;

  // A 256 px texture with eight 64 px frames, keyed '0' to '7'. The sprite lists them in order.
  const atlas = createAtlas(scene.stage.device, 256, drawIconGrid, gridFrames(4, 2, 64), 'icons');
  const keys = Object.keys(atlas.frames);
  const sprite = createSprite(scene.stage.device, atlas, keys);

  // The big sprite changes its `frame`; the row below shows every frame, one entity each.
  const big = addSprite(app, 'big', { type: 'simple', sprite, frame: 0 }, [0, 0.6, 0]);
  big.setLocalScale(2, 2, 1);
  const row = keys.map((_, i) => {
    const e = addSprite(app, `frame ${i}`, { type: 'simple', sprite, frame: i }, [(i - 3.5) * 0.95, -1.5, 0]);
    e.setLocalScale(0.7, 0.7, 1);
    return e;
  });

  const show = (frame: number): void => {
    big.sprite!.frame = frame;
    row.forEach((e, i) => e.setLocalScale(i === frame ? 0.95 : 0.7, i === frame ? 0.95 : 0.7, 1));
  };
  show(0);

  let t = 0;
  let auto = true;
  let slider: HTMLInputElement | undefined;
  app.on('update', (dt: number) => {
    if (!auto) return;
    t += dt;
    const frame = Math.floor(t / 0.7) % keys.length;
    show(frame);
    if (slider) slider.value = String(frame);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    slider = panel.slider('frame', 0, keys.length - 1, 1, 0, (v) => {
      auto = false;
      show(v);
    });
    panel.button('Auto cycle', () => {
      auto = true;
    });
    panel.readout('Same sprite asset on nine entities; only the frame index differs.');
  }

  return () => {
    sprite.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
