// Driving the world yourself: enabled = false, then update(dt) for pause, step and slow motion
import { Vector3 } from '@zephyr3d/base';
import { button, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, colliderOf, dynBall, dynBox, floor, launch, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 20, 12);

  respawn(
    kit,
    () => {
      const nodes = [];
      for (let i = 0; i < 5; i++) {
        const ball = dynBall(kit, 0.35, new Vector3(-4 + i * 2, 4 + (i % 3), 0), [ORANGE, YELLOW, BLUE][i % 3]!);
        colliderOf(ball).restitution = 0.7;
        nodes.push(ball);
      }
      for (let i = 0; i < 3; i++) nodes.push(dynBox(kit, 0.6, new Vector3(-3 + i * 3, 7, 2), YELLOW));
      return nodes;
    },
    12000,
    'Drop again',
  );

  // With the world disabled it no longer steps on its own: update(dt) advances it
  // by dt seconds, still in fixed steps.
  let manual = stage.preview;
  let speed = 1;
  kit.world.enabled = !manual;
  const world = kit.world;
  let t = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    if (stage.preview) speed = 0.55 + 0.5 * Math.sin(t * 0.8); // cards breathe between slow and fast
    if (manual) world.update((dtMs / 1000) * speed);
    stage.caption(manual ? `manual: world.update(dt × ${speed.toFixed(2)})` : 'the world steps itself');
  });

  if (stage.bar) {
    toggle(stage.bar, 'Step it myself', false, (v) => {
      manual = v;
      world.enabled = !v;
    });
    slider(stage.bar, 'Time scale', [0, 2, 0.05], speed, (v) => (speed = v));
    button(stage.bar, 'Step 1/60 s', () => {
      // One frame at a time works while paused: set the time scale to 0, or just press this
      world.update(1 / 60);
    });
  }

  orbit(kit, new Vector3(0, 4, 11), new Vector3(0, 2.5, 0));
  launch(kit);
});
