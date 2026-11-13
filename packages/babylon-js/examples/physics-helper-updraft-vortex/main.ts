// PhysicsHelper updraft and vortex events on balls
import {
  Color3,
  MeshBuilder,
  PhysicsBody,
  PhysicsHelper,
  PhysicsMotionType,
  PhysicsShapeSphere,
  PhysicsUpdraftMode,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 24, beta: 1.2, target: new Vector3(0, 4, 0) } });
  const { scene } = ps;
  staticFloor(scene, 30, 14);

  const helper = new PhysicsHelper(scene);
  const radius = 3;
  const height = 9;
  const strength = 22;
  const updraftAt = new Vector3(-6, 0, 0);
  const vortexAt = new Vector3(6, 0, 0);

  const updraft = helper.updraft(updraftAt, { radius, strength, height, updraftMode: PhysicsUpdraftMode.Center });
  const vortex = helper.vortex(vortexAt, radius, strength * 0.8, height);
  // Events do nothing until enabled; enable() hooks them into the physics step.
  updraft?.enable();
  vortex?.enable();
  ps.onDispose(() => {
    updraft?.disable();
    updraft?.dispose();
    vortex?.disable();
    vortex?.dispose();
  });

  // Translucent columns just show where the events act.
  for (const [at, color] of [[updraftAt, '#7dcfff'], [vortexAt, '#bb9af7']] as const) {
    const col = MeshBuilder.CreateCylinder('column', { diameter: radius * 2, height, tessellation: 32 }, scene);
    col.position.set(at.x, height / 2, at.z);
    const mat = new StandardMaterial('col-mat', scene);
    mat.diffuseColor = Color3.FromHexString(color);
    mat.alpha = 0.15;
    mat.backFaceCulling = false;
    col.material = mat;
    col.isPickable = false;
  }

  const shape = new PhysicsShapeSphere(Vector3.Zero(), 0.4, scene);
  const balls: Mesh[] = [];
  const spawn = (): void => {
    const side = balls.length % 2 === 0 ? updraftAt : vortexAt;
    const ball = MeshBuilder.CreateSphere('ball', { diameter: 0.8, segments: 10 }, scene);
    ball.position.set(side.x + (Math.random() - 0.5) * 3, 1 + Math.random() * 2, (Math.random() - 0.5) * 3);
    paint(ball, side === updraftAt ? '#7dcfff' : '#bb9af7');
    const body = new PhysicsBody(ball, PhysicsMotionType.DYNAMIC, false, scene);
    body.shape = shape;
    body.setMassProperties({ mass: 0.5 });
    balls.push(ball);
    if (balls.length > (ctx.preview ? 10 : 18)) balls.shift()!.dispose();
  };
  const timer = setInterval(spawn, 450);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('Events enabled', true, (on) => {
      if (on) {
        updraft?.enable();
        vortex?.enable();
      } else {
        updraft?.disable();
        vortex?.disable();
      }
    });
    panel.readout('Left: updraft (Center mode). Right: vortex. Both are PhysicsHelper events with a radius and height.');
  }

  ps.stage.run(() => {
    ps.camera.alpha += 0.0015;
    // Anything thrown out of the columns is recycled.
    for (const b of balls) if (b.position.y > height + 6 || Math.abs(b.position.x) > 14) b.position.set((Math.random() < 0.5 ? -6 : 6) + Math.random(), 1, 0);
  });
  return () => ps.dispose();
};

export default mount;
