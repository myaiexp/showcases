// Every PhysicsShape type dropped side by side
import {
  AbstractMesh,
  MeshBuilder,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsShapeBox,
  PhysicsShapeCapsule,
  PhysicsShapeContainer,
  PhysicsShapeConvexHull,
  PhysicsShapeCylinder,
  PhysicsShapeMesh,
  PhysicsShapeSphere,
  Quaternion,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import type { PhysicsShape } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 20, beta: 1.15, target: new Vector3(0, 1, 0) } });
  const { scene } = ps;
  staticFloor(scene, 24, 10);

  // Shape parameters are in the body's LOCAL space, so every shape is built around the origin.
  const sphere = new PhysicsShapeSphere(Vector3.Zero(), 0.7, scene);
  const cylinder = new PhysicsShapeCylinder(new Vector3(0, -0.6, 0), new Vector3(0, 0.6, 0), 0.6, scene);
  const capsule = new PhysicsShapeCapsule(new Vector3(0, -0.35, 0), new Vector3(0, 0.35, 0), 0.5, scene);
  const box = new PhysicsShapeBox(Vector3.Zero(), new Quaternion(0, 0, 0, 1), new Vector3(1.3, 1.3, 1.3), scene);

  // The hull is computed from a mesh's vertices; the same mesh drives the visual.
  const gem = MeshBuilder.CreatePolyhedron('gem', { type: 3, size: 0.8 }, scene);
  gem.setEnabled(false);
  const hull = new PhysicsShapeConvexHull(gem, scene);

  // A container holds child shapes with their own transforms: here a T made of two boxes.
  const container = new PhysicsShapeContainer(scene);
  container.addChild(new PhysicsShapeBox(Vector3.Zero(), new Quaternion(0, 0, 0, 1), new Vector3(1.8, 0.5, 0.6), scene), new Vector3(0, 0.5, 0));
  container.addChild(new PhysicsShapeBox(Vector3.Zero(), new Quaternion(0, 0, 0, 1), new Vector3(0.5, 1.2, 0.6), scene), new Vector3(0, -0.3, 0));

  // A mesh shape keeps every triangle, so it can be concave: a static ring a ball falls through.
  const ring = MeshBuilder.CreateTorus('ring', { diameter: 2.4, thickness: 0.5, tessellation: 24 }, scene);
  ring.position.set(8, 1.2, 0);
  paint(ring, '#7aa2f7');
  const meshShape = new PhysicsShapeMesh(ring, scene);
  const ringBody = new PhysicsBody(ring, PhysicsMotionType.STATIC, false, scene);
  ringBody.shape = meshShape;

  const specs: { x: number; color: string; shape: PhysicsShape; make: () => TransformNode }[] = [
    { x: -9, color: '#f7768e', shape: sphere, make: () => MeshBuilder.CreateSphere('sphere', { diameter: 1.4 }, scene) },
    { x: -6, color: '#e0af68', shape: cylinder, make: () => MeshBuilder.CreateCylinder('cylinder', { height: 1.2, diameter: 1.2 }, scene) },
    { x: -3, color: '#9ece6a', shape: capsule, make: () => MeshBuilder.CreateCapsule('capsule', { height: 1.7, radius: 0.5 }, scene) },
    { x: 0, color: '#bb9af7', shape: box, make: () => MeshBuilder.CreateBox('box', { size: 1.3 }, scene) },
    { x: 3, color: '#7dcfff', shape: hull, make: () => gem.clone('gem-copy') },
    { x: 8, color: '#ff9e64', shape: sphere, make: () => MeshBuilder.CreateSphere('through-ring', { diameter: 1.4 }, scene) },
    {
      x: 5,
      color: '#c0caf5',
      shape: container,
      make: () => {
        // Visual meshes for the two children, parented under one node that carries the body.
        const root = new TransformNode('t-root', scene);
        const bar = MeshBuilder.CreateBox('bar', { width: 1.8, height: 0.5, depth: 0.6 }, scene);
        bar.position.y = 0.5;
        const stem = MeshBuilder.CreateBox('stem', { width: 0.5, height: 1.2, depth: 0.6 }, scene);
        stem.position.y = -0.3;
        bar.parent = root;
        stem.parent = root;
        paint(bar, '#c0caf5');
        paint(stem, '#c0caf5');
        return root;
      },
    },
  ];

  let live: TransformNode[] = [];
  const drop = (): void => {
    for (const m of live) m.dispose();
    live = [];
    specs.forEach((s, i) => {
      const mesh = s.make();
      if (mesh instanceof AbstractMesh) paint(mesh, s.color);
      mesh.setEnabled(true);
      mesh.position.set(s.x, s.x === 8 ? 5 : 3 + (i % 3), s.x === 8 ? 0 : (i % 2) * 0.6 - 0.3);
      mesh.rotationQuaternion = Quaternion.FromEulerAngles(0.3 * i, 0.2 * i, 0.4);
      const body = new PhysicsBody(mesh, PhysicsMotionType.DYNAMIC, false, scene);
      body.shape = s.shape;
      body.setMassProperties({ mass: 1 });
      live.push(mesh);
    });
  };
  drop();
  const timer = setInterval(drop, ctx.preview ? 3500 : 5000);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('Left to right: sphere, cylinder, capsule, box, convex hull, container (T), then a ball falling through a static mesh-shape ring.');
    panel.button('Drop again', drop);
  }

  ps.stage.run();
  return () => ps.dispose();
};

export default mount;
