// PhysicsCharacterController on stairs and a moving platform
import {
  CharacterSupportedState,
  MeshBuilder,
  PhysicsBody,
  PhysicsCharacterController,
  PhysicsMotionType,
  PhysicsShapeBox,
  Quaternion,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { alpha: -1.2, beta: 1.1, radius: 17, target: new Vector3(0, 1, 0) } });
  const { scene, camera } = ps;
  staticFloor(scene, 26, 12);

  const slab = (name: string, size: Vector3, pos: Vector3, color: string, motion: PhysicsMotionType): PhysicsBody => {
    const mesh = MeshBuilder.CreateBox(name, { width: size.x, height: size.y, depth: size.z }, scene);
    mesh.position.copyFrom(pos);
    paint(mesh, color);
    const body = new PhysicsBody(mesh, motion, false, scene);
    body.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), size, scene);
    return body;
  };
  // Stairs: five 0.3 m risers, then a landing.
  for (let k = 0; k < 5; k++) {
    const h = 0.3 * (k + 1);
    slab(`step-${k}`, new Vector3(0.9, h, 4), new Vector3(-4.5 + k * 0.9, h / 2, 0), '#565f89', PhysicsMotionType.STATIC);
  }
  slab('landing', new Vector3(3, 1.5, 4), new Vector3(-0.5 + 1.5, 0.75, 0), '#6b7399', PhysicsMotionType.STATIC);
  // A kinematic platform: an ANIMATED body the character can stand on and be carried by.
  const platform = slab('platform', new Vector3(3, 0.4, 3), new Vector3(6, 0.2, 0), '#e0af68', PhysicsMotionType.ANIMATED);
  const platformMesh = platform.transformNode;

  // The controller: a capsule (height and radius) at a start position.
  const h = 1.8;
  const r = 0.5;
  const display = MeshBuilder.CreateCapsule('character', { height: h, radius: r }, scene);
  paint(display, '#7dcfff');
  const controller = new PhysicsCharacterController(new Vector3(-8, 1.2, 0), { capsuleHeight: h, capsuleRadius: r }, scene);
  controller.maxStepHeight = 0.45;
  // The controller has its own observable for what it pushes into.
  let pushes = 0;
  controller.onTriggerCollisionObservable.add(() => pushes++);
  ps.onDispose(() => controller.dispose());

  const up = Vector3.Up();
  const down = new Vector3(0, -1, 0);
  const gravity = new Vector3(0, -18, 0);
  const desired = new Vector3();
  const velocity = new Vector3();
  const keys = new Set<string>();
  let jump = false;
  let t = 0;
  let readout: HTMLElement | undefined;

  if (!ctx.preview) {
    const down_ = (e: KeyboardEvent): void => {
      if (['w', 'a', 's', 'd', ' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) e.preventDefault();
      keys.add(e.key.toLowerCase());
      if (e.key === ' ') jump = true;
    };
    const up_ = (e: KeyboardEvent): void => void keys.delete(e.key.toLowerCase());
    window.addEventListener('keydown', down_);
    window.addEventListener('keyup', up_);
    ps.onDispose(() => {
      window.removeEventListener('keydown', down_);
      window.removeEventListener('keyup', up_);
    });
    const panel = createPanel(el);
    readout = panel.readout();
    panel.readout('WASD or arrows to walk (relative to the camera), space to jump, drag to orbit.');
  }

  // Scripted walk for the cards: waypoints on the ground plane, a jump at the landing.
  const script = [new Vector3(2.5, 0, 0), new Vector3(2.5, 0, 0.1), new Vector3(-7, 0, 0), new Vector3(6, 0, 0), new Vector3(-8, 0, 0)];
  let wp = 0;
  let hold = 0;

  ps.stage.run(() => {
    const dt = Math.min(ps.stage.engine.getDeltaTime() / 1000, 0.05);
    t += dt;
    // The platform is animated: give it a velocity and the controller is carried along when it stands on it.
    platform.setLinearVelocity(new Vector3(0, 0, Math.cos(t * 0.9) * 3 * 0.9));

    // 1) Input as a world-space direction.
    desired.setAll(0);
    const pos = controller.getPosition();
    if (ctx.preview) {
      const target = script[wp]!;
      const tx = target.x === 6 ? 6 : target.x;
      const tz = target.x === 6 ? platformMesh.position.z : target.z;
      const to = new Vector3(tx - pos.x, 0, tz - pos.z);
      if (hold > 0) hold -= dt;
      else if (to.length() < 0.5) {
        hold = 1.2;
        if (wp === 1) jump = true;
        wp = (wp + 1) % script.length;
      } else desired.copyFrom(to.normalize());
    } else {
      const fwd = camera.getTarget().subtract(camera.position);
      fwd.y = 0;
      fwd.normalize();
      const right = Vector3.Cross(up, fwd);
      if (keys.has('w') || keys.has('arrowup')) desired.addInPlace(fwd);
      if (keys.has('s') || keys.has('arrowdown')) desired.subtractInPlace(fwd);
      if (keys.has('d') || keys.has('arrowright')) desired.addInPlace(right);
      if (keys.has('a') || keys.has('arrowleft')) desired.subtractInPlace(right);
      if (desired.lengthSquared() > 0) desired.normalize();
    }
    desired.scaleInPlace(4.5);

    // 2) The loop the docs summarise: checkSupport, choose a velocity, setVelocity, integrate.
    const support = controller.checkSupport(dt, down);
    velocity.copyFrom(controller.getVelocity());
    if (support.supportedState === CharacterSupportedState.SUPPORTED) {
      // On the ground: follow the surface (and carry its velocity), then maybe jump.
      controller.calculateMovementToRef(dt, Vector3.Forward(), support.averageSurfaceNormal, velocity, support.averageSurfaceVelocity, desired, up, velocity);
      if (jump) velocity.y += 7;
    } else {
      // In the air: keep the vertical speed, fall under gravity, steer a little.
      velocity.x += (desired.x - velocity.x) * Math.min(1, dt * 3);
      velocity.z += (desired.z - velocity.z) * Math.min(1, dt * 3);
      velocity.y += gravity.y * dt;
    }
    jump = false;
    controller.setVelocity(velocity);
    controller.integrate(dt, support, gravity);
    display.position.copyFrom(controller.getPosition());

    if (!ctx.preview) camera.target = Vector3.Lerp(camera.target, controller.getPosition(), 0.1);
    else if (display.position.y < -5) controller.setPosition(new Vector3(-8, 1.2, 0));
    if (readout) readout.textContent = `state ${CharacterSupportedState[support.supportedState]}  pushes ${pushes}  position ${display.position.x.toFixed(1)}, ${display.position.y.toFixed(1)}, ${display.position.z.toFixed(1)}`;
  });
  return () => ps.dispose();
};

export default mount;
