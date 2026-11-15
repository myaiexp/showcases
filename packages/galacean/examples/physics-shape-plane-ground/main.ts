// PlaneColliderShape is an infinite ground; shape.rotation tilts it
import { PlaneColliderShape, StaticCollider, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 2.5, 10], target: [2, 0, 0], floor: false, hint: 'Change the plane tilt: it has no edge, so nothing ever stops the balls.' });
  const ground = w.root.createChild('plane ground');
  const plane = new PlaneColliderShape();
  const collider = ground.addComponent(StaticCollider);
  collider.addShape(plane);
  plane.material.dynamicFriction = 0.3;
  plane.material.staticFriction = 0.3;
  outline(w.root, collider, unlit(w.engine, PALETTE.cyan));
  let tilt = 12;
  tick(w.root, () => {
    plane.rotation = new Vector3(0, 0, -tilt);
    w.say(`PlaneColliderShape.rotation = (0, 0, ${(-tilt).toFixed(0)})`);
  });
  const colors = [PALETTE.amber, PALETTE.green, PALETTE.violet, PALETTE.red];
  rain(w, 0.7, 8, (n, parent) => ball(parent, [-4 + rnd(n) * 0.8, 3 + (n % 3) * 0.3, rnd(n + 5) * 1.2], 0.4, colors[n % 4]!).entity);
  if (!w.stage.preview) slider(w.stage.bar, 'tilt', -30, 30, 1, tilt, (v) => (tilt = v), (v) => `${v} deg`);
  return w.stage.dispose;
};

export default mount;
