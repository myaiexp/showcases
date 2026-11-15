// Character tuning: stepHeight, slopeLimit, snapToGround and pushBodies on one course
import { Vector3 } from '@zephyr3d/base';
import { CharacterController, Mesh, NodePhysics } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { cast, capsuleShape, GREEN, launch, mat, orbit, startPhysics } from '../../shared/phys-kit.ts';
import { buildCourse } from '../../shared/phys-course.ts';
import { COURSE_PATH, lerpTo, makeDriver } from '../../shared/phys-walker.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 15 });
  buildCourse(kit);

  const hero = new Mesh(kit.scene, capsuleShape(0.3, 1.8, 0), mat(GREEN));
  hero.position.setXYZ(0, 0, 4);
  cast(kit, hero);
  const controller = new CharacterController();
  controller.height = 1.8;
  controller.radius = 0.3;
  hero.physics = new NodePhysics({ character: controller });

  const drive = makeDriver(kit, hero, COURSE_PATH);
  let vy = 0;
  kit.world.on('fixedupdate', (dt: number) => {
    const d = drive();
    if (controller.isGrounded) vy = d.jump ? 5.5 : -1;
    else vy -= 9.81 * dt;
    controller.move(new Vector3(d.x * 4 * dt, vy * dt, d.z * 4 * dt));
  });

  const readout = stage.readout();
  const describe = (): string =>
    `stepHeight ${controller.stepHeight.toFixed(2)} m · slopeLimit ${controller.slopeLimit.toFixed(0)}° · slideSlope ${controller.slideSlope.toFixed(0)}° · snapToGround ${controller.snapToGround.toFixed(2)} m · pushBodies ${controller.pushBodies}`;

  if (stage.bar) {
    // Tuning properties: the 0.25 m steps need stepHeight >= 0.25, the 0.5 m ledge more than 0.5,
    // and the 25° and 55° ramps are cut by slopeLimit and slideSlope.
    slider(stage.bar, 'stepHeight (m)', [0, 0.7, 0.01], controller.stepHeight, (v) => (controller.stepHeight = v));
    slider(stage.bar, 'slopeLimit (°)', [5, 80, 1], controller.slopeLimit, (v) => (controller.slopeLimit = v));
    slider(stage.bar, 'slideSlope (°)', [5, 80, 1], controller.slideSlope, (v) => (controller.slideSlope = v));
    slider(stage.bar, 'snapToGround (m)', [0, 0.6, 0.01], controller.snapToGround, (v) => (controller.snapToGround = v));
    toggle(stage.bar, 'pushBodies', true, (v) => (controller.pushBodies = v));
  } else {
    // Cards swap between a character that climbs the steps and one that does not
    stage.every(4500, (i) => (controller.stepHeight = i % 2 ? 0.05 : 0.3));
  }

  const camera = orbit(kit, new Vector3(0, 6, 12), new Vector3(0, 1, 4));
  camera.controller = null;
  const eye = new Vector3(0, 6, 12);
  const look = new Vector3(0, 1, 4);
  kit.myApp.on('tick', (dtMs: number) => {
    const p = hero.position;
    const k = 1 - Math.exp((-4 * Math.min(dtMs, 100)) / 1000);
    lerpTo(eye, p.x, p.y + 5, p.z + 8, k);
    lerpTo(look, p.x, p.y + 1, p.z, k);
    camera.lookAt(eye, look, Vector3.axisPY());
    const text = describe();
    stage.caption(stage.preview ? `stepHeight ${controller.stepHeight.toFixed(2)} m` : text);
    if (readout) readout.textContent = text + '   (WASD, space)';
  });

  launch(kit);
});
