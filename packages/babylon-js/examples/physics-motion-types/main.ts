// STATIC, ANIMATED and DYNAMIC bodies, sleep, mass properties
import { MeshBuilder, PhysicsBody, PhysicsMotionType, PhysicsShapeBox, PhysicsShapeSphere, Quaternion, Vector3 } from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 24, beta: 1.15, target: new Vector3(0, 2, 0) } });
  const { scene } = ps;
  staticFloor(scene, 30, 10);

  const boxShape = (x: number, y: number, z: number): PhysicsShapeBox => new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(x, y, z), scene);
  const makeBox = (name: string, size: Vector3, pos: Vector3, color: string, motion: PhysicsMotionType, asleep = false): { mesh: Mesh; body: PhysicsBody } => {
    const mesh = MeshBuilder.CreateBox(name, { width: size.x, height: size.y, depth: size.z }, scene);
    mesh.position.copyFrom(pos);
    paint(mesh, color);
    // The third argument asks for the body to start in sleep mode.
    const body = new PhysicsBody(mesh, motion, asleep, scene);
    body.shape = boxShape(size.x, size.y, size.z);
    if (motion !== PhysicsMotionType.STATIC) body.setMassProperties({ mass: 1 });
    return { mesh, body };
  };

  // STATIC: never moves, still stops everything that lands on it.
  makeBox('static-ledge', new Vector3(4, 0.6, 3), new Vector3(-10, 1.5, 0), '#565f89', PhysicsMotionType.STATIC);

  // ANIMATED: moved by setting its velocity; a dynamic crate rides it and can't push it around.
  const lift = makeBox('lift', new Vector3(3, 0.5, 3), new Vector3(-3, 1, 0), '#e0af68', PhysicsMotionType.ANIMATED);
  let t = 0;

  // Sleep mode: a stack that starts asleep until something hits it.
  const stack: { mesh: Mesh; body: PhysicsBody }[] = [];
  const buildStack = (): void => {
    for (const s of stack) s.mesh.dispose();
    stack.length = 0;
    for (let i = 0; i < 4; i++) stack.push(makeBox(`sleeper-${i}`, new Vector3(1.4, 1.4, 1.4), new Vector3(5, 0.7 + i * 1.4, 0), '#9ece6a', PhysicsMotionType.DYNAMIC, true));
  };

  // Mass properties: a sphere whose centre of mass sits low, so it rights itself like a roly-poly.
  const ballShape = new PhysicsShapeSphere(Vector3.Zero(), 0.8, scene);
  const dynamics: Mesh[] = [];
  const spawn = (): void => {
    for (const m of dynamics.splice(0)) m.dispose();
    const crate = makeBox('crate', new Vector3(1, 1, 1), new Vector3(-3, 4, 0), '#f7768e', PhysicsMotionType.DYNAMIC);
    const ball = MeshBuilder.CreateSphere('roly-poly', { diameter: 1.6, segments: 16 }, scene);
    ball.position.set(-10, 6, 0.4);
    paint(ball, '#7dcfff');
    const body = new PhysicsBody(ball, PhysicsMotionType.DYNAMIC, false, scene);
    body.shape = ballShape;
    body.setMassProperties({ mass: 1, centerOfMass: new Vector3(0, -0.6, 0) });
    // The bowling ball that wakes the stack up.
    const bowling = MeshBuilder.CreateSphere('bowling', { diameter: 1.4, segments: 12 }, scene);
    bowling.position.set(13, 1.6, 0);
    paint(bowling, '#ff9e64');
    const bb = new PhysicsBody(bowling, PhysicsMotionType.DYNAMIC, false, scene);
    bb.shape = new PhysicsShapeSphere(Vector3.Zero(), 0.7, scene);
    bb.setMassProperties({ mass: 3 });
    bb.setLinearVelocity(new Vector3(-14, 0, 0));
    dynamics.push(crate.mesh, ball, bowling);
    buildStack();
  };
  spawn();
  const timer = setInterval(spawn, 5500);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('Grey: STATIC ledge. Gold: ANIMATED lift driven by setLinearVelocity. Green: stack created asleep. Blue: centerOfMass below the middle.');
    panel.button('Restart', spawn);
  }

  ps.stage.run(() => {
    t += ps.stage.engine.getDeltaTime() / 1000;
    // An animated body keeps the velocity you give it, regardless of what rests on it.
    lift.body.setLinearVelocity(new Vector3(0, Math.cos(t * 1.2) * 1.8, 0));
  });
  return () => ps.dispose();
};

export default mount;
