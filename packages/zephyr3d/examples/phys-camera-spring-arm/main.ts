// Spring arm: a sphere swept back from the character pulls the camera in front of walls
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { CharacterController, getInput, Mesh, NodePhysics, PerspectiveCamera } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { cast, capsuleShape, GREEN, launch, mat, startPhysics } from '../../shared/phys-kit.ts';
import { buildCameraWorld, CAMERA_PATH, LAYER_PROPS } from '../../shared/phys-course.ts';
import { makeDriver } from '../../shared/phys-walker.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 15 });
  buildCameraWorld(kit);
  const readout = stage.readout();

  const hero = new Mesh(kit.scene, capsuleShape(0.3, 1.8, 0), mat(GREEN));
  hero.position.setXYZ(0, 0, 8);
  cast(kit, hero);
  const controller = new CharacterController();
  controller.height = 1.8;
  controller.radius = 0.3;
  hero.physics = new NodePhysics({ character: controller });

  // Camera orbit angles and the arm length; drag to turn, wheel to zoom
  let yaw = 0;
  let pitch = 0.35;
  let armLength = 5;
  let dragging = false;
  getInput().use((ev, type) => {
    if (type === 'pointerdown' && ev.button === 0) dragging = true;
    else if (type === 'pointerup' && ev.button === 0) dragging = false;
    else if (type === 'pointermove' && dragging) {
      yaw -= ev.movementX * 0.005;
      pitch = Math.min(1.3, Math.max(-0.6, pitch + ev.movementY * 0.005));
    } else if (type === 'wheel') armLength = Math.min(12, Math.max(1.5, armLength * Math.exp(ev.deltaY * 0.001)));
    else return false;
    return true;
  });

  const drive = makeDriver(kit, hero, CAMERA_PATH, { yaw: () => yaw });
  let vy = 0;
  kit.world.on('fixedupdate', (dt: number) => {
    const d = drive();
    if (controller.isGrounded) vy = d.jump ? 5.5 : -1;
    else vy -= 9.81 * dt;
    controller.move(new Vector3(d.x * 4 * dt, vy * dt, d.z * 4 * dt));
  });

  let collision = true;
  let probe = 0.25;
  const camera = new PerspectiveCamera(kit.scene, Math.PI / 3, 0.05, 200);
  kit.scene.mainCamera = camera;
  const noRotation = Quaternion.identity();
  const origin = new Vector3(hero.position.x, hero.position.y + 1.5, hero.position.z);
  const LAG_SPEED = 10;
  let t = 0;

  kit.myApp.on('tick', (dtMs: number) => {
    const dt = Math.min(dtMs, 100) / 1000;
    t += dt;
    if (stage.preview) {
      yaw = 0.9 * Math.sin(t * 0.35);
      pitch = 0.3 + 0.15 * Math.sin(t * 0.5);
    }
    // The arm's origin: a point on the character, followed with a little lag
    const k = Math.min(1, dt * LAG_SPEED);
    origin.setXYZ(
      origin.x + (hero.position.x - origin.x) * k,
      origin.y + (hero.position.y + 1.5 - origin.y) * k,
      origin.z + (hero.position.z - origin.z) * k,
    );
    // The wanted camera position is the origin moved back along the view direction
    const back = new Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
    let distance = armLength;
    let blocker = '';
    if (collision) {
      // Sweep a small sphere from the origin towards it; the camera goes where the sphere stopped
      const hit = kit.world.shapeCast({ type: 'sphere', radius: probe }, origin, noRotation, back, armLength, {
        exclude: hero.physics,
        layerMask: ~(1 << LAYER_PROPS), // props on their own layer are left out
      });
      if (hit) {
        distance = hit.distance; // the sphere's centre travelled this far, not up to hit.point
        blocker = hit.node.name || 'floor';
      }
    }
    const eye = Vector3.add(origin, Vector3.scale(back, distance), new Vector3());
    camera.lookAt(eye, origin, Vector3.axisPY());
    const text = blocker ? `arm ${distance.toFixed(2)} of ${armLength.toFixed(1)} m, blocked by ${blocker}` : `arm free, ${armLength.toFixed(1)} m`;
    stage.caption(text);
    if (readout) readout.textContent = text + (stage.preview ? '' : '   (WASD, drag, wheel)');
  });

  if (stage.bar) {
    toggle(stage.bar, 'Collision test', true, (v) => (collision = v));
    slider(stage.bar, 'Probe radius (m)', [0.05, 0.6, 0.01], probe, (v) => (probe = v));
  }

  launch(kit);
});
