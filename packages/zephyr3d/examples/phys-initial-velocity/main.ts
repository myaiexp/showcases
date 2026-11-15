// Initial velocity: bodies that start out moving and spinning, with no script
import { Vector3 } from '@zephyr3d/base';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, dynBall, dynBox, floor, GREEN, launch, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 14 });
  floor(kit, 28, 10);
  stage.caption('initialLinearVelocity at 30° · 45° · 60°, and a spinning box');

  let speed = 11; // m/s
  const angles = [30, 45, 60];
  const colors = [ORANGE, YELLOW, BLUE];
  const build = () => [
    ...angles.map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      const ball = dynBall(kit, 0.3, new Vector3(-8, 0.4, -2 + i * 2), colors[i]!);
      // Applied once, when the node enters the scene and the body is first built (world space, m/s)
      ball.physics!.body!.initialLinearVelocity = new Vector3(speed * Math.cos(a), speed * Math.sin(a), 0);
      ball.physics!.body!.linearDamping = 0.5; // so it stops rolling before the floor ends
      return ball;
    }),
    (() => {
      const box = dynBox(kit, new Vector3(0.9, 0.9, 0.9), new Vector3(-8, 0.5, 4), GREEN);
      box.physics!.body!.initialLinearVelocity = new Vector3(5, 0, 0);
      box.physics!.body!.initialAngularVelocity = new Vector3(0, 6.28, 0); // one turn a second about Y
      return box;
    })(),
  ];
  respawn(kit, build, 6000, 'Launch again');

  if (stage.bar) slider(stage.bar, 'Speed (m/s)', [5, 16, 0.5], speed, (v) => (speed = v));

  orbit(kit, new Vector3(0, 6, 14), new Vector3(0, 1, 0));
  launch(kit);
});
