// DynamicCollider.isKinematic: an immovable wall, then a free body
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, crate, PALETTE, rain, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 11], target: [-1, 1, 0], hint: 'Toggle isKinematic by hand; balls keep coming every second.' });
  const c = crate(w.root, [0, 0.9, 0], [1.8, 1.8, 1.8], PALETTE.violet);
  c.body.mass = 3;
  let auto = w.stage.preview;
  const set = (v: boolean): void => {
    c.body.isKinematic = v;
    w.say(`crate.isKinematic = ${v}`);
  };
  set(true);
  let last = -1;
  tick(w.root, (_dt, t) => {
    if (!auto) return;
    const slot = Math.floor(t / 3.2);
    if (slot !== last) {
      last = slot;
      if (slot % 2 === 0) {
        c.entity.transform.setPosition(0, 0.9, 0);
        c.entity.transform.setRotation(0, 0, 0);
      }
      set(slot % 2 === 0);
    }
  });
  rain(w, 1, 6, (n, parent) => {
    const b = ball(parent, [6, 0.6 + (n % 3) * 0.5, 0], 0.35, PALETTE.amber);
    b.body.linearVelocity = new Vector3(-9, 2, 0);
    b.shape.material.bounciness = 0.3;
    return b.entity;
  });
  if (!w.stage.preview) {
    checkbox(w.stage.bar, 'isKinematic', true, (v) => {
      auto = false;
      set(v);
    });
  }
  return w.stage.dispose;
};

export default mount;
