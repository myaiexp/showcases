// One body over many thin instances, per-instance mass
import { Color4, Matrix, MeshBuilder, PhysicsBody, PhysicsMotionType, PhysicsShapeSphere, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 20, beta: 1.15, target: new Vector3(0, 2, 0) } });
  const { scene } = ps;
  staticFloor(scene, 24, 14);

  const count = ctx.preview ? 24 : 48;
  const sphere = MeshBuilder.CreateSphere('instanced-sphere', { diameter: 1, segments: 12 }, scene);
  paint(sphere, '#ffffff');

  // Thin instances carry the matrices; the last argument false keeps the buffer non-static so physics can write to it.
  const matrices = new Float32Array(count * 16);
  const colors = new Float32Array(count * 4);
  const place = (): void => {
    for (let i = 0; i < count; i++) {
      Matrix.Translation((Math.random() - 0.5) * 12, 1 + (i % 8) * 1.1, (Math.random() - 0.5) * 8).copyToArray(matrices, i * 16);
    }
  };
  place();
  const mass = (i: number): number => 1 + (i % 3) * 2;
  for (let i = 0; i < count; i++) {
    // Heavier instances are redder.
    const c = new Color4(0.4 + 0.3 * (i % 3), 0.8 - 0.3 * (i % 3), 0.9 - 0.3 * (i % 3), 1);
    colors.set([c.r, c.g, c.b, c.a], i * 4);
  }
  sphere.thinInstanceSetBuffer('matrix', matrices, 16, false);
  sphere.thinInstanceSetBuffer('color', colors, 4);

  // One body and one shape cover every instance; instance-level calls take an instanceIndex.
  const body = new PhysicsBody(sphere, PhysicsMotionType.DYNAMIC, false, scene);
  body.shape = new PhysicsShapeSphere(Vector3.Zero(), 0.5, scene);
  for (let i = 0; i < count; i++) body.setMassProperties({ mass: mass(i) }, i);

  // Without an instanceIndex the same impulse goes to all instances: light ones jump higher.
  const popAll = (strength = 9): void => body.applyImpulse(new Vector3(0, strength, 0), body.getObjectCenterWorld(0));
  // With an index, only that instance gets it.
  const kickFirst = (): void => body.applyImpulse(new Vector3(40, 10, 0), body.getObjectCenterWorld(0), 0);
  let strength = 9;
  const timer = setInterval(() => {
    popAll(strength);
    kickFirst();
  }, ctx.preview ? 2500 : 3500);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Impulse on all instances', 0, 20, 1, strength, (v) => (strength = v));
    panel.button('Pop all', () => popAll(strength));
    panel.button('Kick instance 0', kickFirst);
    panel.row();
    panel.readout(`${count} thin instances, one PhysicsBody. Mass is 1, 3 or 5 per instance (blue to red).`);
  }

  ps.stage.run();
  return () => ps.dispose();
};

export default mount;
