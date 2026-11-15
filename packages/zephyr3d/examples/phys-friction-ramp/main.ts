// Friction: four boxes with different Collider.friction slide down one ramp
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { BoxShape, Collider, Mesh, NodePhysics } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, cast, colliderOf, dynBox, floor, GREEN, launch, mat, orbit, ORANGE, respawn, SLATE, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

const TILT = 0.42; // radians; the ramp's right end is lower

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 20, 12);
  stage.caption('friction 0.05 · 0.3 · 0.6 · 1.0 (averaged with the ramp\'s)');

  // A static ramp: a Collider on a tilted node
  const ramp = new Mesh(kit.scene, new BoxShape({ size: 9, sizeY: 0.3, sizeZ: 6 }), mat(SLATE));
  ramp.position.setXYZ(0, 2.3, 0);
  ramp.rotation = Quaternion.fromAxisAngle(Vector3.axisPZ(), -TILT);
  const rampCollider = new Collider();
  rampCollider.size = new Vector3(9, 0.3, 6);
  rampCollider.friction = 0.5;
  ramp.physics = new NodePhysics({ colliders: [rampCollider] });
  cast(kit, ramp);

  const frictions = [0.05, 0.3, 0.6, 1.0];
  const colors = [ORANGE, YELLOW, GREEN, BLUE];
  const build = (): Mesh[] =>
    frictions.map((f, i) => {
      // A point on the ramp's top face, a little up-slope of its middle
      const local = new Vector3(-3, 0.15 + 0.4, -2.25 + i * 1.5);
      const p = Quaternion.fromAxisAngle(Vector3.axisPZ(), -TILT).transform(local, new Vector3());
      const box = dynBox(kit, 0.8, new Vector3(p.x, 2.3 + p.y, p.z), colors[i]!, 2);
      box.rotation = Quaternion.fromAxisAngle(Vector3.axisPZ(), -TILT);
      colliderOf(box).friction = f;
      return box;
    });
  respawn(kit, build, 6500, 'Slide again');

  if (stage.bar) slider(stage.bar, 'Ramp friction', [0, 1.5, 0.05], 0.5, (v) => (rampCollider.friction = v));

  orbit(kit, new Vector3(0, 5, 11), new Vector3(0, 1.8, 0));
  launch(kit);
});
