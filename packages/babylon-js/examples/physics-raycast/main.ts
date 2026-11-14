// raycastToRef with a reused result, hit marker and collideWith
import {
  Color3,
  MeshBuilder,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsRaycastResult,
  PhysicsShapeBox,
  PhysicsShapeSphere,
  Quaternion,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { PhysicsEngine } from '@babylonjs/core/Physics/v2/physicsEngine';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const BOXES = 1;
const SPHERES = 2;
const FILTERS = { all: BOXES | SPHERES, boxes: BOXES, spheres: SPHERES } as const;
type Filter = keyof typeof FILTERS;

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { alpha: -Math.PI / 2, beta: 0.9, radius: 22, target: new Vector3(0, 0, 0) } });
  const { scene } = ps;
  staticFloor(scene, 24, 24);

  // Static obstacles: boxes belong to category 1, spheres to category 2.
  const obstacles: Array<{ at: Vector3; box: boolean }> = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    obstacles.push({ at: new Vector3(Math.cos(a) * 7, 0, Math.sin(a) * 7), box: i % 2 === 0 });
  }
  obstacles.push({ at: new Vector3(2.5, 0, 1.5), box: true }, { at: new Vector3(-2, 0, -2.5), box: false });
  for (const o of obstacles) {
    const mesh: Mesh = o.box ? MeshBuilder.CreateBox('block', { width: 2, height: 2.4, depth: 2 }, scene) : MeshBuilder.CreateSphere('orb', { diameter: 2.4, segments: 16 }, scene);
    mesh.position.set(o.at.x, 1.2, o.at.z);
    paint(mesh, o.box ? '#bb9af7' : '#e0af68');
    const body = new PhysicsBody(mesh, PhysicsMotionType.STATIC, false, scene);
    body.shape = o.box
      ? new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(2, 2.4, 2), scene)
      : new PhysicsShapeSphere(Vector3.Zero(), 1.2, scene);
    body.shape.filterMembershipMask = o.box ? BOXES : SPHERES;
  }

  const marker = MeshBuilder.CreateSphere('hit-marker', { diameter: 0.5 }, scene);
  paint(marker, '#f7768e').emissiveColor = new Color3(0.9, 0.2, 0.3);
  const normal = MeshBuilder.CreateLines('hit-normal', { points: [Vector3.Zero(), Vector3.Up()], updatable: true }, scene);
  normal.color = new Color3(1, 1, 0.4);
  const ray = MeshBuilder.CreateLines('ray', { points: [Vector3.Zero(), Vector3.Right()], updatable: true }, scene);
  ray.color = new Color3(0.5, 1, 0.7);

  // One result object, reused for every cast (the docs stress this).
  const result = new PhysicsRaycastResult();
  const physicsEngine = scene.getPhysicsEngine() as PhysicsEngine;
  const origin = new Vector3(0, 1.2, 0);
  const end = new Vector3();
  let angle = 0;
  let filter: Filter = 'all';
  let readout: HTMLElement | undefined;
  let aim: number | null = null;

  const cast = (): void => {
    end.set(origin.x + Math.cos(angle) * 14, origin.y, origin.z + Math.sin(angle) * 14);
    // collideWith picks which shape categories the ray may hit.
    physicsEngine.raycastToRef(origin, end, result, { collideWith: FILTERS[filter] });
    const stop = result.hasHit ? result.hitPointWorld : end;
    MeshBuilder.CreateLines('ray', { points: [origin, stop], instance: ray });
    marker.setEnabled(result.hasHit);
    normal.setEnabled(result.hasHit);
    if (result.hasHit) {
      marker.position.copyFrom(result.hitPointWorld);
      MeshBuilder.CreateLines('hit-normal', { points: [result.hitPointWorld, result.hitPointWorld.add(result.hitNormalWorld.scale(1.2))], instance: normal });
    }
    if (readout) readout.textContent = result.hasHit ? `hit ${result.body?.transformNode.name} at distance ${result.hitDistance.toFixed(2)}` : 'no hit';
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('collideWith', Object.keys(FILTERS) as Filter[], 'all', (v) => (filter = v));
    panel.check('Aim with the pointer', false, (on) => (aim = on ? 0 : null));
    readout = panel.readout();
    ps.stage.canvas.addEventListener('pointermove', (e) => {
      if (aim === null) return;
      const p = scene.pick(e.offsetX, e.offsetY, (m) => m.name === 'floor');
      if (p?.pickedPoint) angle = Math.atan2(p.pickedPoint.z - origin.z, p.pickedPoint.x - origin.x);
    });
  }

  ps.stage.run(() => {
    if (aim === null) angle += ps.stage.engine.getDeltaTime() * 0.0007;
    cast();
  });
  return () => ps.dispose();
};

export default mount;
