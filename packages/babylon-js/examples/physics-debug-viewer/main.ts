// PhysicsViewer showBody and showConstraint, toggled live
import {
  HingeConstraint,
  MeshBuilder,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsShapeBox,
  PhysicsShapeCapsule,
  PhysicsShapeCylinder,
  PhysicsShapeSphere,
  Quaternion,
  Vector3,
} from '@babylonjs/core';
import type { Mesh, PhysicsShape } from '@babylonjs/core';
import { PhysicsViewer } from '@babylonjs/core/Debug/physicsViewer';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 15, beta: 1.15, target: new Vector3(0, 2, 0) } });
  const { scene } = ps;
  const { mesh: floor } = staticFloor(scene, 16, 8);

  const ident = Quaternion.Identity();
  const bodies: PhysicsBody[] = [floor.physicsBody!];
  const meshes: Mesh[] = [floor];
  const add = (mesh: Mesh, color: string, shape: PhysicsShape, motion = PhysicsMotionType.DYNAMIC): PhysicsBody => {
    paint(mesh, color);
    const body = new PhysicsBody(mesh, motion, false, scene);
    body.shape = shape;
    if (motion === PhysicsMotionType.DYNAMIC) body.setMassProperties({ mass: 1 });
    bodies.push(body);
    meshes.push(mesh);
    return body;
  };

  const hingePost = MeshBuilder.CreateBox('post', { width: 0.4, height: 4, depth: 0.4 }, scene);
  hingePost.position.set(-4, 2, 0);
  const postBody = add(hingePost, '#565f89', new PhysicsShapeBox(Vector3.Zero(), ident, new Vector3(0.4, 4, 0.4), scene), PhysicsMotionType.STATIC);
  const flap = MeshBuilder.CreateBox('flap', { width: 2.2, height: 0.3, depth: 1.2 }, scene);
  flap.position.set(-2.8, 3.5, 0);
  const flapBody = add(flap, '#e0af68', new PhysicsShapeBox(Vector3.Zero(), ident, new Vector3(2.2, 0.3, 1.2), scene));
  // A hinge: the flap swings about the z axis through the post.
  const hinge = new HingeConstraint(new Vector3(0.2, 1.5, 0), new Vector3(-1.1, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 0, 1), scene);
  postBody.addConstraint(flapBody, hinge);

  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1.4, segments: 14 }, scene);
  sphere.position.set(1, 4, 0.3);
  add(sphere, '#7dcfff', new PhysicsShapeSphere(Vector3.Zero(), 0.7, scene));
  const capsule = MeshBuilder.CreateCapsule('capsule', { height: 2, radius: 0.5 }, scene);
  capsule.position.set(3, 5, -0.3);
  capsule.rotation.z = 1.2;
  add(capsule, '#9ece6a', new PhysicsShapeCapsule(new Vector3(0, -0.5, 0), new Vector3(0, 0.5, 0), 0.5, scene));
  const barrel = MeshBuilder.CreateCylinder('barrel', { height: 1.4, diameter: 1.4 }, scene);
  barrel.position.set(5, 6, 0);
  barrel.rotation.x = 0.8;
  add(barrel, '#bb9af7', new PhysicsShapeCylinder(new Vector3(0, -0.7, 0), new Vector3(0, 0.7, 0), 0.7, scene));

  // The viewer draws what the engine sees: one debug mesh per body, plus constraint limits.
  const viewer = new PhysicsViewer(scene);
  const show = (): void => {
    for (const b of bodies) viewer.showBody(b);
    viewer.showConstraint(hinge);
  };
  const hide = (): void => {
    for (const b of bodies) viewer.hideBody(b);
    viewer.hideConstraint(hinge);
  };
  show();
  ps.onDispose(() => viewer.dispose());

  // Make the render meshes see-through so the debug shapes are readable.
  for (const m of meshes) if (m.material) m.material.alpha = 0.45;

  const reset = (): void => {
    sphere.physicsBody?.setLinearVelocity(new Vector3(0, 0, 0));
    flapBody.applyImpulse(new Vector3(0, 6, 0), flap.absolutePosition);
    for (const m of [sphere, capsule, barrel]) {
      m.physicsBody?.setLinearVelocity(new Vector3(-1.5, 3, 0));
      m.physicsBody?.setAngularVelocity(new Vector3(2, 1, 3));
    }
  };
  const timer = setInterval(reset, 3000);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('Show physics viewer', true, (v) => {
      if (v) show();
      else hide();
    });
    panel.check('Show render meshes', true, (v) => {
      for (const m of meshes) m.isVisible = v;
    });
    panel.button('Kick the bodies', reset);
  }

  ps.stage.run();
  return () => ps.dispose();
};

export default mount;
