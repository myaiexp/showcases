// CharacterController.nonWalkableMode: stand still or be forced to slide
import { ControllerNonWalkableMode, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { character, incline, Walker } from '../../shared/phys-char.ts';
import { PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [1, 4, 11], target: [1.5, 2, 0], floor: { w: 18, d: 6 }, hint: 'slopeLimit 45 against a 60 degree slope.' });
  incline(w.root, 60, 5, 0, PALETTE.blue);
  let slide = false;
  let walker: Walker | undefined;
  const round = rounds(w, 6, (n, holder) => {
    if (w.stage.preview) slide = n % 2 === 1;
    const c = character(holder, [1.05, 3.2, 0], PALETTE.amber);
    c.controller.slopeLimit = 45;
    c.controller.nonWalkableMode = slide ? ControllerNonWalkableMode.PreventClimbingAndForceSliding : ControllerNonWalkableMode.PreventClimbing;
    walker = c.entity.addComponent(Walker);
    walker.controller = c.controller;
    walker.drive = () => ({ velocity: new Vector3() });
  });
  tick(w.root, () => w.say(`nonWalkableMode = ${slide ? 'PreventClimbingAndForceSliding' : 'PreventClimbing'}\nx = ${walker?.entity.transform.position.x.toFixed(2) ?? ''}`));
  if (!w.stage.preview) {
    checkbox(w.stage.bar, 'PreventClimbingAndForceSliding', false, (v) => {
      slide = v;
      round.restart();
    });
  }
  return w.stage.dispose;
};

export default mount;
