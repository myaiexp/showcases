// BoxColliderShape.size is the collision box, whatever the mesh looks like
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, crate, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 9], target: [0, 1.4, 0], hint: 'The mesh is always 1 x 1 x 1; the outline is shape.size.' });
  const box = crate(w.root, [0, 1.5, 0], [1, 1, 1], PALETTE.amber);
  box.body.mass = 2;
  outline(w.root, box.body, unlit(w.engine, PALETTE.cyan));
  const size = new Vector3(1, 1, 1);
  let auto = w.stage.preview;
  tick(w.root, (_dt, t) => {
    if (auto) size.set(1.4 + Math.sin(t * 0.9) * 0.6, 1.2 + Math.cos(t * 0.7) * 0.7, 1);
    box.shape.size = size;
    w.say(`shape.size = (${size.x.toFixed(2)}, ${size.y.toFixed(2)}, ${size.z.toFixed(2)})`);
  });
  rain(w, 1.1, 5, (n, parent) => {
    const b = ball(parent, [rnd(n) * 1.6, 5, 0], 0.22, PALETTE.cyan);
    b.shape.material.bounciness = 0.5;
    return b.entity;
  });
  if (!w.stage.preview) {
    for (const axis of ['x', 'y', 'z'] as const) {
      slider(w.stage.bar, `size.${axis}`, 0.3, 3, 0.05, 1, (v) => {
        auto = false;
        size[axis] = v;
      });
    }
  }
  return w.stage.dispose;
};

export default mount;
