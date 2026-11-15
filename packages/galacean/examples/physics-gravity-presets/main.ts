// scene.physics.gravity: Earth, Moon, zero and upside-down on the same balls
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { ball, PALETTE, rnd, rounds, wall, world } from '../../shared/phys-kit.ts';

const PRESETS = [
  ['Earth', -9.81],
  ['Moon', -1.62],
  ['Zero', 0],
  ['Upside down', 9.81],
] as const;
const COLORS = [PALETTE.amber, PALETTE.cyan, PALETTE.violet, PALETTE.green, PALETTE.red, PALETTE.blue];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 13], target: [0, 4, 0], hint: 'Move the sliders to bend gravity; "Drop again" throws the balls anew.' });
  wall(w.root, [0, 8.2, 0], [14, 0.4, 8], PALETTE.grey, 'ceiling');
  for (const x of [-1, 1]) wall(w.root, [x * 7.2, 4, 0], [0.4, 8, 8], PALETTE.grey, 'side', false);
  for (const z of [-1, 1]) wall(w.root, [0, 4, z * 2.2], [14, 8, 0.4], PALETTE.grey, 'glass', false);
  const gravity = w.physics.gravity;
  let name = 'custom';
  const show = (): void => w.say(`${name}\nscene.physics.gravity = (${gravity.x.toFixed(2)}, ${gravity.y.toFixed(2)}, ${gravity.z.toFixed(2)})`);
  const round = rounds(w, w.stage.preview ? 4 : 1e9, (n, holder) => {
    if (w.stage.preview) {
      const [label, y] = PRESETS[n % PRESETS.length]!;
      name = label;
      gravity.set(0, y, 0);
    }
    COLORS.forEach((color, i) => {
      const b = ball(holder, [(i - 2.5) * 1.9, 3 + (i % 3) * 1.4, rnd(n * 7 + i) * 1.5], 0.5, color);
      b.shape.material.bounciness = 0.6;
      b.body.linearVelocity = new Vector3(rnd(i + 3) * 3, rnd(i + 9) * 3, 0);
    });
    show();
  });
  w.stage.own(() => gravity.set(0, -9.81, 0));
  if (!w.stage.preview) {
    for (const [axis, min, max] of [['x', -20, 20], ['y', -20, 20], ['z', -20, 20]] as const) {
      slider(w.stage.bar, `gravity.${axis}`, min, max, 0.1, gravity[axis], (v) => {
        gravity[axis] = v;
        w.physics.gravity = gravity;
        name = 'custom';
        show();
      });
    }
    button(w.stage.bar, 'Earth', () => {
      gravity.set(0, -9.81, 0);
      w.physics.gravity = gravity;
      name = 'Earth';
      show();
    });
    button(w.stage.bar, 'Drop again', () => round.restart());
  }
  return w.stage.dispose;
};

export default mount;
