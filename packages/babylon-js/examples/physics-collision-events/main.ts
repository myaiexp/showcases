// Collision and trigger observables with a live event log
import {
  Color3,
  MeshBuilder,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  Quaternion,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 15, beta: 1.2, target: new Vector3(0, 3, 0) } });
  const { scene, plugin } = ps;
  staticFloor(scene, 16, 8);

  // A trigger gate: a shape flagged isTrigger reports overlaps without pushing anything.
  const gate = MeshBuilder.CreateBox('gate', { width: 3, height: 1.2, depth: 3 }, scene);
  gate.position.set(0, 3, 0);
  const gateMat = new StandardMaterial('gate-mat', scene);
  gateMat.diffuseColor = new Color3(0.4, 0.4, 0.5);
  gateMat.alpha = 0.3;
  gate.material = gateMat;
  const gateShape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(3, 1.2, 3), scene);
  gateShape.isTrigger = true;
  const gateBody = new PhysicsBody(gate, PhysicsMotionType.STATIC, false, scene);
  gateBody.shape = gateShape;

  const ballShape = new PhysicsShapeSphere(Vector3.Zero(), 0.5, scene);
  const balls: Mesh[] = [];
  const bodies = new Map<unknown, Mesh>();
  const spawn = (): void => {
    const ball = MeshBuilder.CreateSphere('ball', { diameter: 1, segments: 14 }, scene);
    ball.position.set((Math.random() - 0.5) * 1.6, 8, (Math.random() - 0.5) * 1.6);
    paint(ball, '#7dcfff');
    const body = new PhysicsBody(ball, PhysicsMotionType.DYNAMIC, false, scene);
    body.shape = ballShape;
    body.shape.material = { friction: 0.4, restitution: 0.7 };
    body.setMassProperties({ mass: 1 });
    // Each body opts in: started/continued events, and separately the "ended" event.
    body.setCollisionCallbackEnabled(true);
    body.setCollisionEndedCallbackEnabled(true);
    bodies.set(body, ball);
    balls.push(ball);
    if (balls.length > 5) balls.shift()!.dispose();
  };
  spawn();
  const timer = setInterval(spawn, 1100);
  ps.onDispose(() => clearInterval(timer));

  let log: HTMLElement | undefined;
  const lines: string[] = [];
  const say = (text: string): void => {
    if (!log) return;
    lines.unshift(text);
    lines.length = Math.min(lines.length, 6);
    log.textContent = lines.join('\n');
  };
  const flash = (mesh: Mesh | undefined, hex: string): void => {
    if (!mesh) return;
    paint(mesh, hex);
    setTimeout(() => {
      if (!mesh.isDisposed()) paint(mesh, '#7dcfff');
    }, 250);
  };
  let hits = 0;

  // World-wide observable: every collision of every callback-enabled body arrives here.
  const collisions = plugin.onCollisionObservable.add((event) => {
    if (event.type !== 'COLLISION_STARTED') return;
    hits++;
    const ball = bodies.get(event.collider) ?? bodies.get(event.collidedAgainst);
    flash(ball, '#f7768e');
    say(`${event.type}  ${event.collider.transformNode.name} vs ${event.collidedAgainst.transformNode.name} (#${hits})`);
  });
  // Trigger overlaps arrive on their own world-wide observable.
  const triggers = plugin.onTriggerCollisionObservable.add((event) => {
    const entered = event.type === 'TRIGGER_ENTERED';
    gateMat.diffuseColor = entered ? new Color3(0.3, 0.9, 0.4) : new Color3(0.4, 0.4, 0.5);
    gateMat.alpha = entered ? 0.55 : 0.3;
    say(`${event.type}  ${event.collider.transformNode.name} ${entered ? 'into' : 'out of'} ${event.collidedAgainst.transformNode.name}`);
  });
  ps.onDispose(() => {
    plugin.onCollisionObservable.remove(collisions);
    plugin.onTriggerCollisionObservable.remove(triggers);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    log = panel.readout('Waiting for events...');
    log.style.whiteSpace = 'pre';
    log.style.minHeight = '6.5em';
  }

  ps.stage.run();
  return () => ps.dispose();
};

export default mount;
