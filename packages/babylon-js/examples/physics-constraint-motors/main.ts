// 6DoF constraints with limits and motors: door, slider, turntable
import {
  MeshBuilder,
  Physics6DoFConstraint,
  PhysicsBody,
  PhysicsConstraintAxis,
  PhysicsConstraintMotorType,
  PhysicsMotionType,
  PhysicsShapeBox,
  PhysicsShapeCylinder,
  Quaternion,
  Vector3,
} from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsStage, paint, staticFloor } from '../../shared/physicsStage.ts';

const A = PhysicsConstraintAxis;
const locked = (...axes: PhysicsConstraintAxis[]) => axes.map((axis) => ({ axis, minLimit: 0, maxLimit: 0 }));

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { alpha: -1.35, radius: 22, beta: 1.0, target: new Vector3(0, 1.5, 0) } });
  const { scene } = ps;
  staticFloor(scene, 30, 10);

  const box = (name: string, size: Vector3, pos: Vector3, color: string, motion: PhysicsMotionType, mass = 1): PhysicsBody => {
    const mesh = MeshBuilder.CreateBox(name, { width: size.x, height: size.y, depth: size.z }, scene);
    mesh.position.copyFrom(pos);
    paint(mesh, color);
    const body = new PhysicsBody(mesh, motion, false, scene);
    body.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), size, scene);
    if (motion === PhysicsMotionType.DYNAMIC) body.setMassProperties({ mass });
    return body;
  };
  const ZERO = Vector3.Zero();
  const X = new Vector3(1, 0, 0);
  const Y = new Vector3(0, 1, 0);

  // 1. Door. Every axis is locked except ANGULAR_Y, which is limited to +-80 degrees and driven by a velocity motor.
  const post = box('post', new Vector3(0.4, 4, 0.4), new Vector3(-7, 2, 0), '#565f89', PhysicsMotionType.STATIC);
  const door = box('door', new Vector3(2.4, 3.6, 0.15), new Vector3(-5.6, 2, 0), '#e0af68', PhysicsMotionType.DYNAMIC, 2);
  const doorJoint = new Physics6DoFConstraint(
    { pivotA: new Vector3(0.2, 0, 0), pivotB: new Vector3(-1.2, 0, 0), axisA: X, axisB: X, perpAxisA: Y, perpAxisB: Y },
    [...locked(A.LINEAR_X, A.LINEAR_Y, A.LINEAR_Z, A.ANGULAR_X, A.ANGULAR_Z), { axis: A.ANGULAR_Y, minLimit: -1.4, maxLimit: 1.4 }],
    scene,
  );
  post.addConstraint(door, doorJoint);
  doorJoint.setAxisMotorType(A.ANGULAR_Y, PhysicsConstraintMotorType.VELOCITY);
  doorJoint.setAxisMotorMaxForce(A.ANGULAR_Y, 400);

  // 2. Slider. Only LINEAR_X moves; a POSITION motor chases a target that the loop moves.
  box('rail', new Vector3(6, 0.15, 0.15), new Vector3(0, 2, -0.6), '#565f89', PhysicsMotionType.STATIC);
  const rail = box('rail-anchor', new Vector3(0.3, 0.3, 0.3), new Vector3(0, 2, 0), '#565f89', PhysicsMotionType.STATIC);
  const sled = box('sled', new Vector3(1, 1, 1), new Vector3(0, 2, 0), '#7dcfff', PhysicsMotionType.DYNAMIC);
  const sliderJoint = new Physics6DoFConstraint(
    { pivotA: ZERO, pivotB: ZERO, axisA: X, axisB: X, perpAxisA: Y, perpAxisB: Y },
    [{ axis: A.LINEAR_X, minLimit: -2.5, maxLimit: 2.5 }, ...locked(A.LINEAR_Y, A.LINEAR_Z, A.ANGULAR_X, A.ANGULAR_Y, A.ANGULAR_Z)],
    scene,
  );
  rail.addConstraint(sled, sliderJoint);
  sliderJoint.setAxisMotorType(A.LINEAR_X, PhysicsConstraintMotorType.POSITION);
  sliderJoint.setAxisMotorMaxForce(A.LINEAR_X, 500);

  // 3. Turntable. ANGULAR_X turns around axisA (here world Y) and is left free; a velocity motor spins it.
  const hub = box('hub', new Vector3(0.5, 1, 0.5), new Vector3(7, 0.5, 0), '#565f89', PhysicsMotionType.STATIC);
  const disc = MeshBuilder.CreateCylinder('turntable', { height: 0.3, diameter: 4, tessellation: 40 }, scene);
  disc.position.set(7, 1.2, 0);
  paint(disc, '#9ece6a');
  const discBody = new PhysicsBody(disc, PhysicsMotionType.DYNAMIC, false, scene);
  discBody.shape = new PhysicsShapeCylinder(new Vector3(0, -0.15, 0), new Vector3(0, 0.15, 0), 2, scene);
  discBody.shape.material = { friction: 1, restitution: 0 };
  discBody.setMassProperties({ mass: 4 });
  const spinJoint = new Physics6DoFConstraint(
    { pivotA: new Vector3(0, 0.7, 0), pivotB: ZERO, axisA: Y, axisB: Y, perpAxisA: X, perpAxisB: X },
    locked(A.LINEAR_X, A.LINEAR_Y, A.LINEAR_Z, A.ANGULAR_Y, A.ANGULAR_Z),
    scene,
  );
  hub.addConstraint(discBody, spinJoint);
  spinJoint.setAxisMotorType(A.ANGULAR_X, PhysicsConstraintMotorType.VELOCITY);
  spinJoint.setAxisMotorTarget(A.ANGULAR_X, 2);
  spinJoint.setAxisMotorMaxForce(A.ANGULAR_X, 300);

  const cubes: Mesh[] = [];
  const dropCubes = (): void => {
    for (const c of cubes.splice(0)) c.dispose();
    for (let i = 0; i < 3; i++) {
      const b = MeshBuilder.CreateBox('cube', { size: 0.5 }, scene);
      b.position.set(7 + Math.cos(i * 2.1) * 1.1, 2.2 + i * 0.7, Math.sin(i * 2.1) * 1.1);
      paint(b, ['#f7768e', '#bb9af7', '#ff9e64'][i]!);
      const body = new PhysicsBody(b, PhysicsMotionType.DYNAMIC, false, scene);
      body.shape = new PhysicsShapeBox(Vector3.Zero(), Quaternion.Identity(), new Vector3(0.5, 0.5, 0.5), scene);
      body.setMassProperties({ mass: 0.3 });
      cubes.push(b);
    }
  };
  dropCubes();
  const cubeTimer = setInterval(dropCubes, 7000);
  ps.onDispose(() => clearInterval(cubeTimer));

  let doorDir = 1;
  let doorSpeed = 1.6;
  const flip = (): void => {
    doorDir = -doorDir;
    doorJoint.setAxisMotorTarget(A.ANGULAR_Y, doorDir * doorSpeed);
  };
  doorJoint.setAxisMotorTarget(A.ANGULAR_Y, doorSpeed);
  const doorTimer = setInterval(flip, 2400);
  ps.onDispose(() => clearInterval(doorTimer));

  let t = 0;
  let spin = 2;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Door motor speed', 0.2, 3, 0.1, doorSpeed, (v) => {
      doorSpeed = v;
      doorJoint.setAxisMotorTarget(A.ANGULAR_Y, doorDir * doorSpeed);
    });
    panel.slider('Turntable speed', -4, 4, 0.1, spin, (v) => {
      spin = v;
      spinJoint.setAxisMotorTarget(A.ANGULAR_X, v);
    });
    panel.row();
    panel.readout('Door: ANGULAR_Y limited, VELOCITY motor. Slider: LINEAR_X limited, POSITION motor. Turntable: ANGULAR_X free, VELOCITY motor.');
  }

  ps.stage.run(() => {
    t += ps.stage.engine.getDeltaTime() / 1000;
    sliderJoint.setAxisMotorTarget(A.LINEAR_X, Math.sin(t * 1.1) * 2);
  });
  return () => ps.dispose();
};

export default mount;
