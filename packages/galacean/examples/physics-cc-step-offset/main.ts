// CharacterController.stepOffset: the tallest step it walks up without jumping
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { character, flagNames, stairs, Walker } from '../../shared/phys-char.ts';
import { PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [3.5, 4, 10], target: [3, 1, 0], floor: { w: 18, d: 6 }, hint: 'Each step is 0.4 high; stepOffset says how high a step the character may climb.' });
  stairs(w.root, 5, 0.4, 1, 0.5, PALETTE.blue);
  let offset = 0.2;
  let walker: Walker | undefined;
  const round = rounds(w, 7, (n, holder) => {
    if (w.stage.preview) offset = n % 2 === 0 ? 0.2 : 0.5;
    const c = character(holder, [-6, 1.05, 0], PALETTE.amber);
    c.controller.stepOffset = offset;
    walker = c.entity.addComponent(Walker);
    walker.controller = c.controller;
    walker.drive = () => ({ velocity: new Vector3(2.4, 0, 0) });
  });
  tick(w.root, () => w.say(`stepOffset = ${offset.toFixed(2)}   step height 0.40   move() -> ${flagNames(walker?.flags ?? 0)}`));
  if (!w.stage.preview) {
    slider(w.stage.bar, 'stepOffset', 0, 1, 0.05, offset, (v) => {
      offset = v;
      round.restart();
    });
  }
  return w.stage.dispose;
};

export default mount;
