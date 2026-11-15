// ColliderShape.rotation turns a shape inside an entity that stays put
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, wall, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 11], target: [0, 1.6, 0], floor: false, hint: 'Hold the angle with the slider or let the seesaw swing.' });
  const bar = wall(w.root, [0, 0.2, 0], [8, 0.4, 3], PALETTE.grey, 'platform');
  for (const x of [-1, 1]) wall(w.root, [x * 4.4, 2.5, 0], [0.4, 5, 3], PALETTE.blue, 'stop');
  wall(w.root, [0, -3, 0], [30, 0.4, 6], PALETTE.blue, 'pit floor', false);
  outline(w.root, bar.collider, unlit(w.engine, PALETTE.cyan));
  let swing = true;
  let angle = 0;
  tick(w.root, (_dt, t) => {
    if (swing) angle = Math.sin(t * 0.7) * 16;
    bar.shape.rotation = new Vector3(0, 0, angle);
    w.say(`shape.rotation = (0, 0, ${angle.toFixed(1)})`);
  });
  const colors = [PALETTE.amber, PALETTE.green, PALETTE.violet, PALETTE.red];
  rain(w, 0.9, 6, (n, parent) => ball(parent, [rnd(n) * 2.5, 3.5, 0], 0.4, colors[n % 4]!).entity);
  if (!w.stage.preview) {
    slider(w.stage.bar, 'angle', -25, 25, 1, 0, (v) => {
      swing = false;
      angle = v;
    });
  }
  return w.stage.dispose;
};

export default mount;
