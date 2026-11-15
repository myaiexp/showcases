// staticFriction holds a crate on a tilting ramp until atan(friction)
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { crate, PALETTE, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 12], target: [0, 1.5, 0], floor: false, hint: 'Static friction 0.6 holds up to atan(0.6) = 31 degrees.' });
  const ramp = wall(w.root, [0, 0, 0], [8, 0.4, 3], PALETTE.blue, 'ramp');
  ramp.shape.material.staticFriction = 0.6;
  ramp.shape.material.dynamicFriction = 0.3;
  const c = crate(w.root, [0, 0.6, 0], [1, 1, 1], PALETTE.amber);
  c.shape.material.staticFriction = 0.6;
  c.shape.material.dynamicFriction = 0.3;
  wall(w.root, [0, -6, 0], [60, 0.4, 8], PALETTE.grey, 'catch', false);
  let angle = 0;
  let manual = false;
  let cycle = 0;
  tick(w.root, (_dt, t) => {
    if (!manual) {
      const k = (t - cycle) / 10;
      angle = Math.min(45, k * 45);
      if (k > 1.4) {
        cycle = t;
        c.entity.transform.setPosition(0, 0.6, 0);
        c.entity.transform.setRotation(0, 0, 0);
        c.body.linearVelocity = c.body.linearVelocity.set(0, 0, 0);
      }
    }
    ramp.entity.transform.setRotation(0, 0, -angle);
    w.say(`ramp angle ${angle.toFixed(1)} deg   tan = ${Math.tan((angle * Math.PI) / 180).toFixed(2)}   staticFriction 0.6`);
  });
  if (!w.stage.preview) slider(w.stage.bar, 'angle', 0, 50, 0.5, 0, (v) => {
    manual = true;
    angle = v;
  });
  return w.stage.dispose;
};

export default mount;
