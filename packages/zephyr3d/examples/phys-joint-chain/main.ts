// Ball joints: a chain of beads, each joined to the one before, the first to the world
import { Vector3 } from '@zephyr3d/base';
import { Joint } from '@zephyr3d/scene';
import type { Mesh } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, discard, dynBall, floor, launch, orbit, ORANGE, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 14, 6);
  stage.caption('ball joints: each bead joins the previous one');

  let beads: Mesh[] = [];
  let count = 12;
  const build = (): void => {
    for (const b of beads) discard(kit, b);
    beads = [];
    // Each bead joins the previous one at its left side; the first joins the world
    let prev: Mesh | null = null;
    for (let i = 0; i < count; i++) {
      const last = i === count - 1;
      const bead = dynBall(kit, last ? 0.35 : 0.14, new Vector3(-2.5 + (i + 1) * 0.34, 4, 0), last ? ORANGE : i % 2 ? BLUE : YELLOW, last ? 4 : 0.5);
      const link = new Joint();
      link.type = 'ball';
      link.anchor = new Vector3(-0.17, 0, 0); // pivot, in this bead's own space
      link.connectedBody = prev;
      bead.physics!.joint = link;
      beads.push(bead);
      prev = bead;
    }
  };
  build();

  const swing = (): void => {
    const end = beads[beads.length - 1];
    end?.physics!.body!.applyImpulse(new Vector3(0, 0, 6));
  };
  if (stage.bar) {
    slider(stage.bar, 'Beads', [4, 20, 1], count, (v) => {
      count = v;
      build();
    });
    button(stage.bar, 'Swing', swing);
    button(stage.bar, 'Rebuild', build);
  } else {
    stage.every(3500, (i) => (i % 2 ? swing() : build()));
  }

  orbit(kit, new Vector3(0, 3.5, 9), new Vector3(0, 2.2, 0));
  launch(kit);
});
