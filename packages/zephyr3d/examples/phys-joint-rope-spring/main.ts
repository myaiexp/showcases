// Rope and spring joints: two points joined by a distance limit, or by a spring
import { Vector3 } from '@zephyr3d/base';
import { Joint } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { beam, dynBall, dynBox, floor, launch, marker, orbit, ORANGE, startPhysics, YELLOW, BLUE, GREY } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 12, 6);
  stage.caption('rope: up to length, slack closer · spring: stretches around length');

  // Two-point joints: `anchor` on the body, `connectedAnchor` on the other end:
  // world space when there is no connected body.
  const ropeTop = new Vector3(-2.5, 4.5, 0);
  const lamp = dynBall(kit, 0.3, new Vector3(-0.8, 3.2, 0), YELLOW, 1);
  const rope = new Joint();
  rope.type = 'rope';
  rope.connectedAnchor = ropeTop;
  rope.length = 2.2;
  lamp.physics!.joint = rope;

  const springTop = new Vector3(2.5, 4.5, 0);
  const weight = dynBox(kit, 0.6, new Vector3(2.5, 2.6, 0), ORANGE, 2);
  const spring = new Joint();
  spring.type = 'spring';
  spring.anchor = new Vector3(0, 0.3, 0);
  spring.connectedAnchor = springTop;
  spring.length = 1.4;
  spring.stiffness = 40;
  spring.damping = 0.5;
  weight.physics!.joint = spring;

  // Hooks and the lines drawn to the bodies
  marker(kit, 0.1, GREY).position.set(ropeTop);
  marker(kit, 0.1, GREY).position.set(springTop);
  const ropeLine = beam(kit, BLUE, 0.03);
  const springLine = beam(kit, BLUE, 0.03);
  kit.myApp.on('tick', () => {
    ropeLine.set(ropeTop, lamp.getWorldPosition());
    const w = weight.getWorldPosition();
    springLine.set(springTop, new Vector3(w.x, w.y + 0.3, w.z));
  });

  const nudge = (): void => {
    lamp.physics!.body!.applyImpulse(new Vector3(0, 0, 2.2));
    lamp.physics!.body!.applyImpulse(new Vector3(-2, 1.5, 0));
    weight.physics!.body!.applyImpulse(new Vector3(0, -5, 0));
  };
  if (stage.bar) {
    slider(stage.bar, 'Spring stiffness', [5, 120, 1], spring.stiffness, (v) => (spring.stiffness = v));
    slider(stage.bar, 'Spring damping', [0, 5, 0.1], spring.damping, (v) => (spring.damping = v));
    button(stage.bar, 'Nudge', nudge);
  } else {
    stage.every(3500, () => nudge());
  }

  orbit(kit, new Vector3(0, 3.5, 9), new Vector3(0, 2.6, 0));
  launch(kit);
});
