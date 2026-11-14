// Shape material friction on a ramp and restitution on a floor, one lane per value
import { MeshBuilder, PhysicsBody, PhysicsMotionType, PhysicsShapeBox, PhysicsShapeSphere, Quaternion, Vector3 } from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const FRICTIONS = [0.02, 0.15, 0.3, 0.5, 0.8];
const RESTITUTIONS = [0.1, 0.35, 0.6, 0.8, 0.95];
const SLOPE = 0.4;
const COLORS = ['#f7768e', '#ff9e64', '#e0af68', '#9ece6a', '#7dcfff'];

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { alpha: -1.1, radius: 22, beta: 1.1, target: new Vector3(-1, 1.5, 0) } });
  const { scene } = ps;
  staticFloor(scene, 34, 10);

  // A ramp: a static box tilted about z, with high friction so the sliders' own value decides
  // (friction defaults to combining as the minimum of the two shapes).
  const ramp = MeshBuilder.CreateBox('ramp', { width: 10, height: 0.5, depth: 9 }, scene);
  ramp.position.set(-4, 2.2, 0);
  ramp.rotationQuaternion = Quaternion.FromEulerAngles(0, 0, -SLOPE);
  paint(ramp, '#565f89');
  const rampBody = new PhysicsBody(ramp, PhysicsMotionType.STATIC, false, scene);
  rampBody.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(10, 0.5, 9), scene);
  rampBody.shape.material = { friction: 1, restitution: 0 };

  const live: Mesh[] = [];
  const release = (): void => {
    for (const m of live.splice(0)) m.dispose();
    const lane = (i: number, n: number): number => (i - (n - 1) / 2) * 1.6;

    // Friction lanes: identical boxes, only shape.material.friction differs.
    FRICTIONS.forEach((friction, i) => {
      const box = MeshBuilder.CreateBox('slider', { size: 1 }, scene);
      const x = -7.6;
      // A point on the ramp's top surface at x, lifted by half the box and half the ramp.
      const y = 2.2 - (x + 4) * Math.tan(SLOPE) + 0.5 / Math.cos(SLOPE) + 0.25 / Math.cos(SLOPE);
      box.position.set(x, y, lane(i, FRICTIONS.length));
      box.rotationQuaternion = Quaternion.FromEulerAngles(0, 0, -SLOPE);
      paint(box, COLORS[i]!);
      const body = new PhysicsBody(box, PhysicsMotionType.DYNAMIC, false, scene);
      body.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(1, 1, 1), scene);
      body.shape.material = { friction, restitution: 0 };
      body.setMassProperties({ mass: 1 });
      live.push(box);
    });

    // Restitution lanes: balls dropped from the same height; the bounce combine mode is the maximum.
    RESTITUTIONS.forEach((restitution, i) => {
      const ball = MeshBuilder.CreateSphere('bouncer', { diameter: 1, segments: 12 }, scene);
      ball.position.set(7, 7, lane(i, RESTITUTIONS.length));
      paint(ball, COLORS[i]!);
      const body = new PhysicsBody(ball, PhysicsMotionType.DYNAMIC, false, scene);
      body.shape = new PhysicsShapeSphere(Vector3.Zero(), 0.5, scene);
      body.shape.material = { friction: 0.5, restitution };
      body.setMassProperties({ mass: 1 });
      live.push(ball);
    });
  };
  release();
  const timer = setInterval(release, ctx.preview ? 4500 : 6000);
  ps.onDispose(() => clearInterval(timer));

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout(`Left, ramp lanes, friction ${FRICTIONS.join(' / ')}. Right, bounce lanes, restitution ${RESTITUTIONS.join(' / ')}.`);
    panel.button('Release again', release);
  }

  ps.stage.run();
  return () => ps.dispose();
};

export default mount;
