// Joint motors: velocity, position and a force-limited motor on hinges
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { Joint, Mesh, NodePhysics } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, cast, cylinderShape, dynBox, floor, GREY, launch, mat, orbit, ORANGE, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 16, 8);
  stage.caption('velocity 90°/s · position servo · velocity with a weak maxForce');

  // A bar on a hinge whose axis is Z (the joint node is turned so its Y axis lies along Z)
  const bar = (x: number, color: typeof ORANGE): { joint: Joint; mesh: Mesh } => {
    const mesh = dynBox(kit, new Vector3(2.6, 0.22, 0.22), new Vector3(x, 2.2, 0), color, 4);
    const axle = new Mesh(kit.scene, cylinderShape(0.08, 0.7), mat(GREY));
    axle.parent = mesh;
    axle.rotation = Quaternion.fromAxisAngle(Vector3.axisPX(), Math.PI / 2);
    cast(kit, axle);
    const joint = new Joint();
    joint.type = 'hinge';
    axle.physics = new NodePhysics({ joint });
    return { joint, mesh };
  };

  // 1. Velocity motor: reach a speed (degrees per second) and hold it
  const spinner = bar(-5, ORANGE).joint;
  spinner.motorMode = 'velocity';
  spinner.motorTarget = 90;
  spinner.motorMaxForce = 400;

  // 2. Position motor: pull towards an angle, like a servo
  const servo = bar(0, BLUE).joint;
  servo.motorMode = 'position';
  servo.motorTarget = 0;
  servo.motorStiffness = 300;
  servo.motorDamping = 40;
  servo.motorMaxForce = 0; // 0: no limit

  // 3. Velocity motor with a small motorMaxForce: it gives up against a heavy block
  const weak = bar(5, YELLOW);
  weak.joint.motorMode = 'velocity';
  weak.joint.motorTarget = 90;
  weak.joint.motorMaxForce = 15;
  dynBox(kit, new Vector3(0.7, 1.8, 0.7), new Vector3(5, 0.9, 0), [0.45, 0.45, 0.5], 400);

  let target = 0;
  let t = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    if (stage.preview) target = 70 * Math.sin(t * 0.9);
    servo.motorTarget = target;
  });
  if (stage.bar) slider(stage.bar, 'Servo angle (°)', [-90, 90, 1], 0, (v) => (target = v));

  orbit(kit, new Vector3(0, 3, 12), new Vector3(0, 1.8, 0));
  launch(kit);
});
