// SpriteManager with a sprite sheet drawn in code: each sprite loops through the sheet's cells
import { ArcRotateCamera, Color4, Scalar, Sprite, SpriteManager, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CELL, FRAMES, drawSpriteSheet } from './sheet.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 14, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  scene.clearColor = new Color4(0.06, 0.07, 0.12, 1);

  // size = one cell (square cells, so a single number); capacity = most sprites this manager holds.
  const manager = new SpriteManager('stars', drawSpriteSheet(), 200, CELL, scene);

  const sprites: Sprite[] = [];
  const total = ctx.preview ? 24 : 80;
  for (let i = 0; i < total; i++) {
    const sprite = new Sprite(`star-${i}`, manager);
    sprite.position = new Vector3(Scalar.RandomRange(-8, 8), Scalar.RandomRange(-4, 4), Scalar.RandomRange(-2, 2));
    const size = Scalar.RandomRange(0.8, 2);
    sprite.width = size;
    sprite.height = size;
    // playAnimation(from, to, loop, delay in ms): a smaller delay spins faster.
    sprite.playAnimation(0, FRAMES - 1, true, Scalar.RandomRange(40, 160));
    sprites.push(sprite);
  }

  stage.run(() => {
    const t = performance.now() / 1000;
    sprites.forEach((sprite, i) => (sprite.position.y += Math.sin(t + i) * 0.004));
    if (ctx.preview) camera.alpha += 0.002;
  });

  return () => {
    manager.dispose();
    stage.dispose();
  };
};

export default mount;
