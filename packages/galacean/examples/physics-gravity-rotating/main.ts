// Gravity is a vector: turning it round z rolls balls round the walls of a box
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { arrow, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, wall, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 12], target: [0, 3, 0], floor: false, hint: 'Pause the turn and set the angle yourself.' });
  const { root, physics } = w;
  wall(root, [0, -0.2, 0], [8.8, 0.4, 1.4], PALETTE.grey, 'bottom');
  wall(root, [0, 6.2, 0], [8.8, 0.4, 1.4], PALETTE.grey, 'top');
  wall(root, [-4.2, 3, 0], [0.4, 6.8, 1.4], PALETTE.grey, 'left');
  wall(root, [4.2, 3, 0], [0.4, 6.8, 1.4], PALETTE.grey, 'right');
  wall(root, [0, 3, 0.9], [9, 7, 0.4], PALETTE.grey, 'front glass', false);
  wall(root, [0, 3, -0.9], [9, 7, 0.4], PALETTE.grey, 'back glass', false);
  const colors = [PALETTE.amber, PALETTE.cyan, PALETTE.violet, PALETTE.green];
  for (let i = 0; i < 16; i++) {
    const b = ball(root, [-3 + (i % 4) * 1.5, 1 + Math.floor(i / 4) * 1.2, 0], 0.4, colors[i % 4]!);
    b.shape.material.bounciness = 0.3;
  }
  const pointer = arrow(root, unlit(w.engine, [1, 1, 1]), 0.07);
  const origin = new Vector3(0, 3, 1.1);
  let angle = 0;
  let speed = 0.7;
  let paused = false;
  const apply = (): void => {
    physics.gravity.set(Math.sin(angle) * 9.81, -Math.cos(angle) * 9.81, 0);
    pointer.set(origin, new Vector3(physics.gravity.x * 0.2, physics.gravity.y * 0.2, 0));
    w.say(`gravity = (${physics.gravity.x.toFixed(1)}, ${physics.gravity.y.toFixed(1)}, 0)   angle ${((angle * 180) / Math.PI % 360).toFixed(0)} deg`);
  };
  tick(root, (dt) => {
    if (!paused) angle += dt * speed;
    apply();
  });
  w.stage.own(() => physics.gravity.set(0, -9.81, 0));
  if (!w.stage.preview) {
    slider(w.stage.bar, 'turn speed', 0, 2, 0.05, speed, (v) => (speed = v));
    const box = checkbox(w.stage.bar, 'pause', false, (v) => (paused = v));
    slider(w.stage.bar, 'angle', 0, 360, 1, 0, (v) => {
      angle = (v * Math.PI) / 180;
      paused = true;
      box.checked = true;
    });
  }
  return w.stage.dispose;
};

export default mount;
