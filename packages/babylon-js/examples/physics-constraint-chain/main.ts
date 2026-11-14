// Ball-and-socket chain and distance-constraint pendulums
import {
  BallAndSocketConstraint,
  Color3,
  DistanceConstraint,
  MeshBuilder,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  Quaternion,
  Vector3,
} from '@babylonjs/core';
import type { LinesMesh, Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 26, beta: 1.35, target: new Vector3(0, 5, 0) } });
  const { scene } = ps;
  staticFloor(scene, 40, 12);

  const anchor = (x: number, y: number): { mesh: Mesh; body: PhysicsBody } => {
    const mesh = MeshBuilder.CreateBox('anchor', { size: 0.5 }, scene);
    mesh.position.set(x, y, 0);
    paint(mesh, '#565f89');
    const body = new PhysicsBody(mesh, PhysicsMotionType.STATIC, false, scene);
    body.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(0.5, 0.5, 0.5), scene);
    return { mesh, body };
  };

  // Chain: each link is a thin box. The pivots (+-0.45) sit inside the 1.0 long link, so
  // neighbours overlap a little, which keeps collision and constraint from fighting.
  const linkShape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(0.3, 1, 0.3), scene);
  const top = anchor(-7, 10);
  let previous: PhysicsBody = top.body;
  let previousPivot = new Vector3(0, -0.25, 0);
  const links: { mesh: Mesh; body: PhysicsBody }[] = [];
  const linkCount = ctx.preview ? 7 : 9;
  for (let i = 0; i < linkCount; i++) {
    const mesh = MeshBuilder.CreateBox(`link-${i}`, { width: 0.3, height: 1, depth: 0.3 }, scene);
    mesh.position.set(-7, 10 - 0.25 - 0.45 - i * 0.9, 0);
    paint(mesh, i % 2 ? '#e0af68' : '#f7768e');
    const body = new PhysicsBody(mesh, PhysicsMotionType.DYNAMIC, false, scene);
    body.shape = linkShape;
    // Mass shrinks along the chain: the root-most links are the heaviest, as the docs advise.
    body.setMassProperties({ mass: 2 - (i / linkCount) * 1.6 });
    const joint = new BallAndSocketConstraint(previousPivot, new Vector3(0, 0.45, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 0), scene);
    previous.addConstraint(body, joint);
    previous = body;
    previousPivot = new Vector3(0, -0.45, 0);
    links.push({ mesh, body });
  }

  // Pendulums: a DistanceConstraint only caps the distance, so a ball released sideways swings on a taut "rope".
  const ropes: { line: LinesMesh; from: Mesh; to: Mesh }[] = [];
  const bobs: PhysicsBody[] = [];
  const startBob: Vector3[] = [];
  [0, 4, 8].forEach((dx, i) => {
    const len = 3 + i * 1.2;
    const a = anchor(-1 + dx, 10);
    const bob = MeshBuilder.CreateSphere('bob', { diameter: 1, segments: 14 }, scene);
    const start = new Vector3(-1 + dx + len * 0.98, 10 - len * 0.2, 0);
    bob.position.copyFrom(start);
    startBob.push(start);
    paint(bob, ['#7dcfff', '#9ece6a', '#bb9af7'][i]!);
    const body = new PhysicsBody(bob, PhysicsMotionType.DYNAMIC, false, scene);
    body.shape = new PhysicsShapeSphere(Vector3.Zero(), 0.5, scene);
    body.setMassProperties({ mass: 1 });
    a.body.addConstraint(body, new DistanceConstraint(len, scene));
    bobs.push(body);
    const line = MeshBuilder.CreateLines('rope', { points: [a.mesh.position, bob.position], updatable: true }, scene);
    line.color = new Color3(0.8, 0.85, 1);
    ropes.push({ line, from: a.mesh, to: bob });
  });

  const kick = (): void => {
    const last = links[links.length - 1]!;
    last.body.applyImpulse(new Vector3(7, 2, 0), last.mesh.absolutePosition);
    bobs.forEach((b, i) => {
      b.setLinearVelocity(Vector3.Zero());
      b.transformNode.position.copyFrom(startBob[i]!);
      b.disablePreStep = false;
    });
  };
  kick();
  const timer = setInterval(kick, 6000);
  ps.onDispose(() => clearInterval(timer));

  ps.stage.run(() => {
    for (const r of ropes) MeshBuilder.CreateLines('rope', { points: [r.from.position, r.to.position], instance: r.line });
  });
  return () => ps.dispose();
};

export default mount;
