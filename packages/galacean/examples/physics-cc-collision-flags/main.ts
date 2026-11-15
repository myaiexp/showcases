// The flags move() returns: Sides, Up and Down
import { ControllerCollisionFlag, Keys, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { character, flagNames, Walker } from '../../shared/phys-char.ts';
import { PALETTE, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 11], target: [0, 1.5, 0], floor: { w: 12, d: 4 }, hint: 'Click the canvas: A and D walk, Space jumps.' });
  wall(w.root, [0, 2.7, 0], [8, 0.6, 3], PALETTE.blue, 'ceiling');
  for (const x of [-1, 1]) wall(w.root, [x * 4.3, 1.2, 0], [0.6, 2.4, 3], PALETTE.violet, 'wall');
  const c = character(w.root, [0, 1.05, 0], PALETTE.amber);
  const walker = c.entity.addComponent(Walker);
  walker.controller = c.controller;
  walker.jumpSpeed = 6.5;
  const lamps = panel(w.stage, 'tr');
  let elapsed = 0;
  walker.drive = (dt) => {
    elapsed += dt;
    const input = w.engine.inputManager;
    if (w.stage.preview) {
      const phase = elapsed % 9;
      const dir = phase < 4 ? 1 : phase < 8 ? -1 : 0;
      return { velocity: new Vector3(dir * 3, 0, 0), jump: Math.abs(((elapsed + 0.5) % 1.8) - 0) < dt };
    }
    const dir = input.isKeyHeldDown(Keys.KeyD) ? 1 : input.isKeyHeldDown(Keys.KeyA) ? -1 : 0;
    return { velocity: new Vector3(dir * 3, 0, 0), jump: input.isKeyDown(Keys.Space) };
  };
  tick(w.root, () => {
    const f = walker.flags;
    const lamp = (flag: number, name: string): string => `${f & flag ? '(*)' : '( )'} ${name}`;
    lamps.text(`${lamp(ControllerCollisionFlag.Sides, 'Sides')}\n${lamp(ControllerCollisionFlag.Up, 'Up')}\n${lamp(ControllerCollisionFlag.Down, 'Down')}`);
    w.say(`move() returned ${flagNames(f)}`);
  });
  return w.stage.dispose;
};

export default mount;
