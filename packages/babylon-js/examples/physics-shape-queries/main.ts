// HavokPlugin shapeCast, pointProximity and shapeProximity
import {
  Color3,
  MeshBuilder,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  ProximityCastResult,
  Quaternion,
  ShapeCastResult,
  Vector3,
} from '@babylonjs/core';
import type { Mesh, StandardMaterial } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint } from '../../shared/physicsStage.ts';

const MODES = ['shape cast', 'point proximity', 'shape proximity'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { alpha: -Math.PI / 2, beta: 0.6, radius: 20, target: new Vector3(0, 0, 0) } });
  const { scene, plugin } = ps;

  // Static targets to be found by the queries.
  const targets: Array<{ mesh: Mesh; mat: StandardMaterial }> = [];
  for (let i = 0; i < 5; i++) {
    const box = i % 2 === 0;
    const mesh = box ? MeshBuilder.CreateBox('target', { width: 1.6, height: 1.6, depth: 1.6 }, scene) : MeshBuilder.CreateSphere('target', { diameter: 1.8, segments: 14 }, scene);
    mesh.position.set(-6 + i * 3, 0.8, i % 2 === 0 ? 1.5 : -1.5);
    const mat = paint(mesh, '#565f89');
    const body = new PhysicsBody(mesh, PhysicsMotionType.STATIC, false, scene);
    body.shape = box ? new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(1.6, 1.6, 1.6), scene) : new PhysicsShapeSphere(Vector3.Zero(), 0.9, scene);
    targets.push({ mesh, mat });
  }
  const floor = MeshBuilder.CreateGround('ground', { width: 22, height: 10 }, scene);
  paint(floor, '#1c2030');

  // The probe: a sphere shape that is never attached to a body, only handed to the queries.
  const probeShape = new PhysicsShapeSphere(Vector3.Zero(), 0.5, scene);
  const probe = MeshBuilder.CreateSphere('probe', { diameter: 1, segments: 12 }, scene);
  paint(probe, '#7dcfff');
  const ghost = MeshBuilder.CreateSphere('ghost', { diameter: 1, segments: 12 }, scene);
  paint(ghost, '#9ece6a', 0.4);
  const link = MeshBuilder.CreateLines('link', { points: [Vector3.Zero(), Vector3.Up()], updatable: true }, scene);
  link.color = new Color3(1, 0.85, 0.3);

  // Result objects are reused between frames.
  const local = new ShapeCastResult();
  const world = new ShapeCastResult();
  const proxLocal = new ProximityCastResult();
  const proxWorld = new ProximityCastResult();
  const proxPoint = new ProximityCastResult();

  let mode: Mode = 'shape cast';
  let t = 0;
  let readout: HTMLElement | undefined;
  const setLink = (a: Vector3, b: Vector3): void => void MeshBuilder.CreateLines('link', { points: [a, b], instance: link });
  const highlight = (hit: Mesh | null): void => {
    for (const x of targets) x.mat.diffuseColor = x.mesh === hit ? new Color3(0.97, 0.46, 0.56) : Color3.FromHexString('#565f89');
  };

  const start = new Vector3(-9, 0.8, 0);
  const finish = new Vector3(9, 0.8, 0);
  ps.stage.run(() => {
    t += ps.stage.engine.getDeltaTime() / 1000;
    if (ctx.preview) mode = MODES[Math.floor(t / 4) % 3]!;
    ghost.setEnabled(mode === 'shape cast');
    const rot = Quaternion.Identity();

    if (mode === 'shape cast') {
      // Sweep the sphere along a segment and read how far along it the first hit is.
      const z = Math.sin(t * 0.8) * 2;
      start.z = finish.z = z;
      probe.position.copyFrom(start);
      plugin.shapeCast({ shape: probeShape, rotation: rot, startPosition: start, endPosition: finish, shouldHitTriggers: false }, local, world);
      const f = world.hasHit ? world.hitFraction : 1;
      ghost.position.copyFrom(Vector3.Lerp(start, finish, f));
      setLink(start, ghost.position);
      highlight(world.hasHit ? (world.body?.transformNode as Mesh) : null);
      if (readout) readout.textContent = world.hasHit ? `shapeCast hit fraction ${world.hitFraction.toFixed(2)}` : 'shapeCast: nothing in the way';
    } else if (mode === 'point proximity') {
      // The closest shape within maxDistance of a point (0 would test overlap only).
      probe.position.set(Math.sin(t * 0.6) * 8, 0.8, Math.cos(t * 1.1) * 2.5);
      plugin.pointProximity({ position: probe.position, maxDistance: 3, collisionFilter: {}, shouldHitTriggers: false }, proxPoint);
      highlight(proxPoint.hasHit ? (proxPoint.body?.transformNode as Mesh) : null);
      setLink(probe.position, proxPoint.hasHit ? proxPoint.hitPoint : probe.position);
      if (readout) readout.textContent = proxPoint.hasHit ? `pointProximity distance ${proxPoint.hitDistance.toFixed(2)}` : 'pointProximity: nothing within 3';
    } else {
      // Like point proximity, but with a whole shape; results come back in shape-local and world space.
      probe.position.set(Math.sin(t * 0.6) * 8, 0.8, Math.cos(t * 1.1) * 2.5);
      plugin.shapeProximity({ shape: probeShape, position: probe.position, rotation: rot, maxDistance: 2, shouldHitTriggers: false }, proxLocal, proxWorld);
      highlight(proxWorld.hasHit ? (proxWorld.body?.transformNode as Mesh) : null);
      setLink(proxWorld.hasHit ? proxLocal.hitPoint.add(probe.position) : probe.position, proxWorld.hasHit ? proxWorld.hitPoint : probe.position);
      if (readout) readout.textContent = proxWorld.hasHit ? `shapeProximity distance ${proxWorld.hitDistance.toFixed(2)}` : 'shapeProximity: nothing within 2';
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('Query', MODES, mode, (v) => (mode = v));
    readout = panel.readout();
  }
  return () => ps.dispose();
};

export default mount;
