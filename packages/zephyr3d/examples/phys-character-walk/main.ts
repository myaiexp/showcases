// Character controller: move() in the fixed step, with gravity and jumping kept by the game
import { Vector3 } from '@zephyr3d/base';
import { CharacterController, Mesh, NodePhysics } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { cast, capsuleShape, GREEN, launch, mat, orbit, startPhysics } from '../../shared/phys-kit.ts';
import { buildCourse } from '../../shared/phys-course.ts';
import { COURSE_PATH, lerpTo, makeDriver } from '../../shared/phys-walker.ts';

const WALK_SPEED = 4;
const JUMP_SPEED = 5.5;
const GRAVITY = 9.81;

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 15 });
  buildCourse(kit);
  const readout = stage.readout();

  // The character goes in the node's `character` slot and brings its own capsule:
  // no RigidBody or Collider. The capsule's bottom sits on the node's origin.
  const hero = new Mesh(kit.scene, capsuleShape(0.3, 1.8, 0), mat(GREEN));
  hero.position.setXYZ(0, 0, 4);
  cast(kit, hero);
  const controller = new CharacterController();
  controller.height = 1.8;
  controller.radius = 0.3;
  hero.physics = new NodePhysics({ character: controller });

  const drive = makeDriver(kit, hero, COURSE_PATH);

  // Moving from the fixed update makes the walk the same at any frame rate. The
  // controller applies no gravity: a small downward speed while grounded keeps it
  // on the ground (and sliding down slopes that are too steep).
  let vy = 0;
  kit.world.on('fixedupdate', (dt: number) => {
    const d = drive();
    if (controller.isGrounded) vy = d.jump ? JUMP_SPEED : -1;
    else vy -= GRAVITY * dt;
    const result = controller.move(new Vector3(d.x * WALK_SPEED * dt, vy * dt, d.z * WALK_SPEED * dt));
    if (readout) readout.textContent = `${result.grounded ? 'grounded' : 'in the air'} · hits ${result.collisions.length}`;
  });

  const camera = orbit(kit, new Vector3(0, 6, 12), new Vector3(0, 1, 4));
  camera.controller = null; // the camera follows the hero instead
  const eye = new Vector3(0, 6, 12);
  const look = new Vector3(0, 1, 4);
  kit.myApp.on('tick', (dtMs: number) => {
    const p = hero.position;
    const k = 1 - Math.exp(-4 * Math.min(dtMs, 100) / 1000);
    lerpTo(eye, p.x, p.y + 5, p.z + 8, k);
    lerpTo(look, p.x, p.y + 1, p.z, k);
    camera.lookAt(eye, look, Vector3.axisPY());
    if (stage.preview) stage.caption(controller.isGrounded ? 'grounded: the autopilot walks, steps up, jumps' : 'in the air');
  });
  if (stage.bar) stage.caption('WASD / arrows to walk, space to jump (click the view first)');

  launch(kit);
});
