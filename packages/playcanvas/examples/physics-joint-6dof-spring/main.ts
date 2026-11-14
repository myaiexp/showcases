// 6dof joints: one free axis turned into a spring by stiffness and damping
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every } from '../../shared/physics.ts';

const LINEAR_K = [40, 120, 360];
const ANGULAR_K = [20, 90];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, pitch: -12, target: [0, 3, 0], floor: 14, yaw: 12, autoRotate: 2 });
  const { app } = scene;
  let stiffness = 1;
  let damping = 2;

  const springs: { joint: pc.JointComponent; k: number; axis: 'linear' | 'angular' }[] = [];

  // Every axis of a 6dof joint starts locked. Open Y (linear) or Z (angular), then add a spring.
  const hang = (body: pc.Entity, k: number, axis: 'linear' | 'angular'): void => {
    const e = new pc.Entity('6dof');
    e.setPosition(body.getPosition());
    app.root.addChild(e);
    e.addComponent(
      'joint',
      axis === 'linear'
        ? { type: pc.JOINTTYPE_6DOF, entityA: body, linearMotionY: pc.MOTION_FREE, linearStiffness: new pc.Vec3(0, k, 0), linearDamping: new pc.Vec3(0, damping, 0) }
        : { type: pc.JOINTTYPE_6DOF, entityA: body, angularMotionZ: pc.MOTION_FREE, angularStiffness: new pc.Vec3(0, 0, k), angularDamping: new pc.Vec3(0, 0, damping) },
    );
    springs.push({ joint: e.joint!, k, axis });
  };

  const crates = LINEAR_K.map((k, i) => {
    const crate = addBody(app, { name: `linear spring ${k}`, size: 1, position: [-5 + i * 2.2, 4, 0], colour: ['#e8794a', '#f2c14e', '#7bc67b'][i]!, body: { mass: 2 } });
    hang(crate, k, 'linear');
    return crate;
  });
  const paddles = ANGULAR_K.map((k, i) => {
    const paddle = addBody(app, { name: `angular spring ${k}`, size: [2.4, 0.3, 0.8], position: [3.2 + i * 3, 3, 0], colour: ['#4ab3e8', '#a78bfa'][i]!, body: { mass: 2 } });
    hang(paddle, k, 'angular');
    return paddle;
  });

  // Plain impulses set the springs going; the joints do the rest.
  const kick = (): void => {
    crates.forEach((c) => c.rigidbody!.applyImpulse(0, -10, 0));
    paddles.forEach((p) => p.rigidbody!.applyTorqueImpulse(0, 0, 7));
  };
  every(app, 3, kick);

  const apply = (): void => {
    for (const s of springs) {
      const k = s.k * stiffness;
      if (s.axis === 'linear') {
        s.joint.linearStiffness = new pc.Vec3(0, k, 0);
        s.joint.linearDamping = new pc.Vec3(0, damping, 0);
      } else {
        s.joint.angularStiffness = new pc.Vec3(0, 0, k);
        s.joint.angularDamping = new pc.Vec3(0, 0, damping);
      }
    }
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('stiffness x', 0.2, 3, 0.1, stiffness, (v) => ((stiffness = v), apply()));
    panel.slider('damping', 0, 10, 0.5, damping, (v) => ((damping = v), apply()));
    panel.button('Kick', kick);
  }

  return () => scene.dispose();
};

export default mount;
