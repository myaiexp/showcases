// Forces: wind applied every fixed step to a wall of crates
import { Vector3 } from '@zephyr3d/base';
import type { Mesh } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, colliderOf, dynBox, floor, launch, orbit, ORANGE, respawn, startPhysics } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 16, 10);

  let crates: Mesh[] = [];
  let windOn = true;
  let strength = 10; // newtons per crate
  respawn(
    kit,
    () => {
      crates = [];
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
        const crate = dynBox(kit, 0.8, new Vector3(-1.3 + x * 0.82, 0.4 + y * 0.81, 0), (x + y) % 2 ? BLUE : ORANGE, 2);
        colliderOf(crate).friction = 0.6;
        crates.push(crate);
      }
      return crates;
    },
    9000,
    'Rebuild wall',
  );

  // A force applied before a simulation step acts on that step only, so calling
  // this from the world's fixed update gives the same push at any frame rate.
  let t = 0;
  kit.world.on('fixedupdate', (dt: number) => {
    t += dt;
    if (!windOn) return;
    // In cards the wind comes in gusts so the wall visibly sways and falls
    const gust = stage.preview ? Math.max(0, Math.sin(t * 0.9)) : 1;
    for (const crate of crates) {
      const body = crate.physics!.body!;
      body.wakeUp(); // a body at rest sleeps, and forces on sleepers are lost
      body.applyForce(new Vector3(strength * gust, 0, 0));
    }
    stage.caption(`wind ${(strength * gust).toFixed(0)} N per crate, +X`);
  });

  if (stage.bar) {
    toggle(stage.bar, 'Wind', true, (v) => (windOn = v));
    slider(stage.bar, 'Strength (N)', [0, 30, 1], strength, (v) => (strength = v));
  }

  orbit(kit, new Vector3(-1, 3.2, 9), new Vector3(0, 1.6, 0));
  launch(kit);
});
