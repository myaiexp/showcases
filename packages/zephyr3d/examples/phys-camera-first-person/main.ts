// First person: the eye sweeps out of the capsule when leaning round a corner
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { CharacterController, getInput, Mesh, NodePhysics, PerspectiveCamera } from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { cast, capsuleShape, GREEN, launch, mat, startPhysics } from '../../shared/phys-kit.ts';
import { buildCameraWorld, LAYER_PROPS } from '../../shared/phys-course.ts';
import { makeDriver } from '../../shared/phys-walker.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 15 });
  buildCameraWorld(kit);
  const readout = stage.readout();

  const hero = new Mesh(kit.scene, capsuleShape(0.3, 1.8, 0), mat(GREEN));
  // Start beside the long wall, so leaning towards it is stopped by the sweep
  hero.position.setXYZ(-2.2, 0, 1);
  hero.showState = 'hidden'; // inside the capsule the character's own mesh only blocks the view
  cast(kit, hero);
  const controller = new CharacterController();
  controller.height = 1.8;
  controller.radius = 0.3;
  hero.physics = new NodePhysics({ character: controller });

  let yaw = 0;
  let pitch = 0;
  let dragging = false;
  const keys = new Set<string>();
  getInput().use((ev, type) => {
    if (type === 'pointerdown' && ev.button === 0) dragging = true;
    else if (type === 'pointerup' && ev.button === 0) dragging = false;
    else if (type === 'pointermove' && dragging) {
      yaw -= ev.movementX * 0.005;
      pitch = Math.min(1.4, Math.max(-1.4, pitch + ev.movementY * 0.005));
    } else return false;
    return true;
  });

  // Keys are relative to where the camera looks; cards pace up and down beside the wall
  const drive = makeDriver(kit, hero, [[-2.2, 1.5], [-2.2, -4.5]], { yaw: () => yaw, keys });
  let vy = 0;
  kit.world.on('fixedupdate', (dt: number) => {
    const d = drive();
    if (controller.isGrounded) vy = d.jump ? 5.5 : -1;
    else vy -= 9.81 * dt;
    controller.move(new Vector3(d.x * 3 * dt, vy * dt, d.z * 3 * dt));
  });

  let collision = true;
  const camera = new PerspectiveCamera(kit.scene, Math.PI / 3, 0.05, 200);
  kit.scene.mainCamera = camera;
  const noRotation = Quaternion.identity();
  const EYE_HEIGHT = 1.6;
  const LEAN_DISTANCE = 0.6;
  const LEAN_ROLL = 0.25; // radians of head tilt at a full lean
  let lean = 0; // -1 (left) to 1 (right), eased towards the keys held
  let t = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    const dt = Math.min(dtMs, 100) / 1000;
    t += dt;
    if (stage.preview) {
      yaw = 0.2 * Math.sin(t * 0.7); // looking down the long wall, which is on the left
      pitch = 0.05;
    }
    const wanted = stage.preview ? Math.sign(Math.sin(t * 0.8)) * 0.999 : (keys.has('e') ? 1 : 0) - (keys.has('q') ? 1 : 0);
    lean += (wanted - lean) * Math.min(1, dt * 8);
    // The capsule keeps the eye a radius from every wall, so walking needs no test.
    // Leaning moves the eye out of the capsule: sweep that move from the head sideways.
    const head = new Vector3(hero.position.x, hero.position.y + EYE_HEIGHT, hero.position.z);
    const side = lean < 0 ? -1 : 1;
    const right = new Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
    const leanDir = Vector3.scale(right, side, new Vector3());
    const length = Math.abs(lean) * LEAN_DISTANCE;
    let distance = length;
    let blocker = '';
    if (collision && length > 0) {
      const hit = kit.world.shapeCast({ type: 'sphere', radius: 0.1 }, head, noRotation, leanDir, length, {
        exclude: hero.physics,
        layerMask: ~(1 << LAYER_PROPS),
      });
      if (hit) {
        distance = hit.distance;
        blocker = hit.node.name || 'floor';
      }
    }
    const eye = Vector3.add(head, Vector3.scale(leanDir, distance), new Vector3());
    const roll = ((side * distance) / LEAN_DISTANCE) * LEAN_ROLL;
    const up = Vector3.add(Vector3.scale(Vector3.axisPY(), Math.cos(roll)), Vector3.scale(right, Math.sin(roll)), new Vector3());
    const forward = new Vector3(-Math.sin(yaw) * Math.cos(pitch), -Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
    camera.lookAt(eye, Vector3.add(eye, forward, new Vector3()), up);
    const text = blocker ? `lean ${distance.toFixed(2)} of ${length.toFixed(2)} m, stopped by ${blocker}` : `lean ${distance.toFixed(2)} m, free`;
    stage.caption(text);
    if (readout) readout.textContent = text + '   (WASD, drag to look, Q / E lean)';
  });

  if (stage.bar) toggle(stage.bar, 'Collision test', true, (v) => (collision = v));

  launch(kit);
});
