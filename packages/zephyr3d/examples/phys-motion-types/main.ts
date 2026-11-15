// Motion types: a static block, a kinematic lift and a dynamic stack
import { Vector3 } from '@zephyr3d/base';
import type { Mesh, MotionType } from '@zephyr3d/scene';
import { select, button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, dynBox, dynBall, discard, floor, launch, loopInCard, orbit, ORANGE, SLATE, startPhysics, staticBox, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit);
  stage.caption('static · kinematic · dynamic');

  // Static: only a collider. Dynamic boxes land on it and it never moves.
  staticBox(kit, new Vector3(2, 1, 2), new Vector3(-5, 0.5, 0), SLATE);

  // Kinematic: the node is moved by script, and the body follows it, carrying
  // (and shoving) the dynamic bodies it touches.
  const lift = dynBox(kit, new Vector3(3, 0.3, 3), new Vector3(0, 0.4, 0), BLUE, 10);
  const liftBody = lift.physics!.body!;
  liftBody.motionType = 'kinematic';
  lift.physics!.colliders[0]!.friction = 1;

  const spawned: Mesh[] = [];
  const spawn = (): void => {
    for (let i = 0; i < 3; i++) spawned.push(dynBox(kit, 0.6, new Vector3(-5.2 + i * 0.5, 3 + i * 1.1, 0.2 * i), ORANGE));
    for (let i = 0; i < 3; i++) spawned.push(dynBox(kit, 0.6, new Vector3(-0.7 + i * 0.7, 1.2 + i * 0.7, 0), YELLOW));
    spawned.push(dynBall(kit, 0.35, new Vector3(5, 4, 0), ORANGE, 2));
    for (let i = 0; i < 4; i++) spawned.push(dynBox(kit, 0.6, new Vector3(5, 0.3 + i * 0.62, 0), BLUE));
  };
  const reset = (): void => {
    for (const m of spawned) discard(kit, m);
    spawned.length = 0;
    spawn();
  };
  spawn();

  let t = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    // Only a kinematic body follows its node; the other types ignore this move
    if (liftBody.motionType === 'kinematic') lift.position.setXYZ(0, 1.1 + Math.sin(t * 0.9) * 0.8, 0);
  });

  orbit(kit, new Vector3(0, 5.5, 12), new Vector3(0, 1.2, 0));
  if (stage.bar) {
    select<MotionType>(stage.bar, 'Lift motionType', ['kinematic', 'dynamic', 'static'], 'kinematic', (v) => {
      liftBody.motionType = v;
      liftBody.wakeUp();
    });
    button(stage.bar, 'Reset', reset);
  } else loopInCard(kit, 9000, reset);
  launch(kit);
});
