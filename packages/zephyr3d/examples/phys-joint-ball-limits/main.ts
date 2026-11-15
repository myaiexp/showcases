// Ball joint limits: swingLimit tilts and twistLimit turns, in degrees each way
import { Vector3 } from '@zephyr3d/base';
import { BoxShape, Joint, Mesh, NodePhysics, SphereShape } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, cast, dynBox, floor, launch, mat, orbit, ORANGE, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 10, 6);
  const readout = stage.readout();

  // A post standing on a ball joint at its foot. The joint node is a child of the
  // post: its origin is the pivot and its Y axis the axis swing and twist are measured from.
  const post = dynBox(kit, new Vector3(0.3, 2.2, 0.3), new Vector3(0, 1.4, 0), BLUE, 3);
  // A flag at the top shows the twist
  const arrow = new Mesh(kit.scene, new BoxShape({ size: 0.9, sizeY: 0.2, sizeZ: 0.2 }), mat(ORANGE));
  arrow.parent = post;
  arrow.position.setXYZ(0.55, 0.9, 0);
  cast(kit, arrow);
  const pivot = new Mesh(kit.scene, new SphereShape({ radius: 0.14 }), mat(YELLOW));
  pivot.parent = post;
  pivot.position.setXYZ(0, -1.1, 0);
  cast(kit, pivot);
  const joint = new Joint();
  joint.type = 'ball';
  joint.limitsEnabled = true;
  joint.swingLimit = 35;
  joint.twistLimit = 40;
  pivot.physics = new NodePhysics({ joint });
  post.physics!.body!.angularDamping = 0.6;

  let t = 0;
  let last = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    const body = post.physics!.body!;
    // A push in a circle around the post, and a twist now and then
    body.wakeUp();
    body.applyForce(new Vector3(Math.cos(t * 0.8) * 22, 0, Math.sin(t * 0.8) * 22));
    if (t - last > 2.2) {
      last = t;
      body.applyTorqueImpulse(new Vector3(0, ((Math.floor(t / 2.2) % 2) * 2 - 1) * 6, 0));
    }
    const text = `swingLimit ${joint.swingLimit}° · twistLimit ${joint.twistLimit}°`;
    stage.caption(text);
    if (readout) readout.textContent = text;
  });

  if (stage.bar) {
    slider(stage.bar, 'swingLimit (°)', [5, 90, 1], joint.swingLimit, (v) => (joint.swingLimit = v));
    slider(stage.bar, 'twistLimit (°)', [5, 180, 1], joint.twistLimit, (v) => (joint.twistLimit = v));
    button(stage.bar, 'Twist', () => post.physics!.body!.applyTorqueImpulse(new Vector3(0, 6, 0)));
  }

  orbit(kit, new Vector3(0, 3, 8), new Vector3(0, 1.4, 0));
  launch(kit);
});
