// Prestep TELEPORT vs ACTION and setTargetTransform
import {
  MeshBuilder,
  PhysicsBody,
  PhysicsMotionType,
  PhysicsPrestepType,
  PhysicsShapeBox,
  Quaternion,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

type Lane = { name: string; z: number; color: string; bar: Mesh; body: PhysicsBody };

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { alpha: -1.0, beta: 1.0, radius: 20, target: new Vector3(0, 0.5, 0) } });
  const { scene } = ps;
  staticFloor(scene, 20, 12);

  const cube = (x: number, y: number, z: number): Vector3 => new Vector3(x, y, z);
  const lanes: Lane[] = [];
  const crates: Mesh[] = [];

  // The same bar and the same motion in three lanes; only how the body follows it differs.
  const names = ['prestep TELEPORT', 'prestep ACTION', 'setTargetTransform'];
  const colors = ['#e0af68', '#9ece6a', '#7dcfff'];
  names.forEach((name, i) => {
    const z = (i - 1) * 3.6;
    const bar = MeshBuilder.CreateBox(`bar-${i}`, { width: 1, height: 1.6, depth: 2.4 }, scene);
    bar.position.set(-6, 0.8, z);
    paint(bar, colors[i]!);
    // ANIMATED bodies are driven from outside and never pushed back by what they hit.
    const body = new PhysicsBody(bar, PhysicsMotionType.ANIMATED, false, scene);
    body.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(1, 1.6, 2.4), scene);
    if (i === 0) body.disablePreStep = false; // teleport mode: the node's transform is copied in each step
    if (i === 1) body.setPrestepType(PhysicsPrestepType.ACTION); // action mode: the body moves there as if driven
    lanes.push({ name, z, color: colors[i]!, bar, body });
  });

  const stack = (): void => {
    for (const c of crates.splice(0)) c.dispose();
    for (const lane of lanes) {
      for (let k = 0; k < 3; k++) {
        const c = MeshBuilder.CreateBox('crate', { size: 0.8 }, scene);
        c.position.set(-1 + k * 0.1, 0.4 + k * 0.82, lane.z);
        paint(c, '#c0caf5');
        const b = new PhysicsBody(c, PhysicsMotionType.DYNAMIC, false, scene);
        b.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(0.8, 0.8, 0.8), scene);
        b.setMassProperties({ mass: 0.5 });
        crates.push(c);
      }
    }
  };
  stack();
  const timer = setInterval(stack, 6000);
  ps.onDispose(() => clearInterval(timer));

  let t = 0;
  ps.stage.run(() => {
    t += ps.stage.engine.getDeltaTime() / 1000;
    // Slow approach, quick retreat: the bar sweeps in x over a six-second cycle.
    const phase = (t % 6) / 6;
    const x = -6 + 6.5 * (phase < 0.6 ? phase / 0.6 : 1 - (phase - 0.6) / 0.4);
    for (const lane of lanes.slice(0, 2)) lane.bar.position.x = x;
    // setTargetTransform: say where the body should be and it works out the velocity itself.
    const l = lanes[2]!;
    l.body.setTargetTransform(cube(x, 0.8, l.z), Quaternion.Identity());
  });
  return () => ps.dispose();
};

export default mount;
