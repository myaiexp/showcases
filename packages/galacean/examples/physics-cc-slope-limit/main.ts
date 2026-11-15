// CharacterController.slopeLimit: how steep a ramp may be walked up
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { character, flagNames, incline, Walker } from '../../shared/phys-char.ts';
import { PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const RAMP = 40;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [2, 4, 11], target: [1.5, 1.8, 0], floor: { w: 18, d: 6 }, hint: `The ramp is ${RAMP} degrees steep.` });
  incline(w.root, RAMP, 6, 0, PALETTE.blue);
  let limit = 35;
  let walker: Walker | undefined;
  const round = rounds(w, 7, (n, holder) => {
    if (w.stage.preview) limit = n % 2 === 0 ? 35 : 55;
    const c = character(holder, [-6, 1.05, 0], PALETTE.amber);
    c.controller.slopeLimit = limit;
    walker = c.entity.addComponent(Walker);
    walker.controller = c.controller;
    walker.drive = () => ({ velocity: new Vector3(2.6, 0, 0) });
  });
  tick(w.root, () => w.say(`slopeLimit = ${limit.toFixed(0)}   ramp ${RAMP} deg   move() -> ${flagNames(walker?.flags ?? 0)}`));
  if (!w.stage.preview) {
    slider(w.stage.bar, 'slopeLimit', 10, 80, 1, limit, (v) => {
      limit = v;
      round.restart();
    }, (v) => `${v} deg`);
  }
  return w.stage.dispose;
};

export default mount;
