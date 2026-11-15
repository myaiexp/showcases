// collisionLayer + setColliderLayerCollision: two ball groups ignore each other
import { Layer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 10], target: [0, 2.2, 0], hint: 'The layer table is shared by the whole page, so it is put back on leaving.' });
  const { physics } = w;
  w.stage.own(() => physics.setColliderLayerCollision(Layer.Layer1, Layer.Layer2, true));
  physics.setColliderLayerCollision(Layer.Layer1, Layer.Layer2, true);
  let auto = w.stage.preview;
  const set = (on: boolean): void => {
    physics.setColliderLayerCollision(Layer.Layer1, Layer.Layer2, on);
    w.say(`Layer1 x Layer2 collide: ${physics.getColliderLayerCollision(Layer.Layer1, Layer.Layer2)}`);
  };
  set(true);
  tick(w.root, (_dt, t) => {
    if (auto) {
      const on = Math.floor(t / 6) % 2 === 0;
      if (on !== physics.getColliderLayerCollision(Layer.Layer1, Layer.Layer2)) set(on);
    }
  });
  rain(w, 0.45, 12, (n, parent) => {
    const red = n % 2 === 0;
    const b = ball(parent, [rnd(n) * 0.4, 6.5, 0], 0.5, red ? PALETTE.red : PALETTE.green);
    b.body.collisionLayer = red ? Layer.Layer1 : Layer.Layer2;
    b.shape.material.bounciness = 0.5;
    return b.entity;
  });
  if (!w.stage.preview) {
    checkbox(w.stage.bar, 'Layer1 (red) collides with Layer2 (green)', true, (v) => {
      auto = false;
      set(v);
    });
  }
  return w.stage.dispose;
};

export default mount;
