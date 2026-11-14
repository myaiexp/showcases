// Ball joints holding arms to a world point, one with swing and twist limits
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsScene, every } from '../../shared/physics.ts';

const PIVOT_Y = 5;
const LENGTH = 3;

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, pitch: -18, target: [0, 3, 0], floor: 14, yaw: 20 });
  const { app } = scene;
  let swing = 35;

  const arm = (x: number, colour: string, limits: Record<string, unknown> = {}): { body: pc.Entity; joint: pc.JointComponent; pivot: pc.Vec3 } => {
    const body = new pc.Entity('arm');
    body.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(0.15, LENGTH / 2, 0.15) });
    body.addComponent('rigidbody', { type: 'dynamic', mass: 2, angularDamping: 0.05 });
    addShape(body, 'box', material(colour), [0, 0, 0], [0.3, LENGTH, 0.3], 'rod');
    addShape(body, 'sphere', material(colour), [0, -LENGTH / 2, 0], 0.9, 'bob');
    body.setPosition(x, PIVOT_Y - LENGTH / 2, 0);
    app.root.addChild(body);

    // The joint entity marks the pivot; turned so its local X axis points down along the arm.
    const joint = new pc.Entity('ball joint');
    joint.setPosition(x, PIVOT_Y, 0);
    joint.setEulerAngles(0, 0, -90);
    app.root.addChild(joint);
    // No entityB: entityA is held to this point in world space.
    joint.addComponent('joint', { type: pc.JOINTTYPE_BALL, entityA: body, ...limits });
    addShape(app.root, 'sphere', material('#ffffff', { emissive: '#aaaaaa' }), [x, PIVOT_Y, 0], 0.3, 'pivot');
    return { body, joint: joint.joint!, pivot: new pc.Vec3(x, PIVOT_Y, 0) };
  };
  const limited = arm(-3, '#e8794a', { enableLimits: true, swingLimitY: swing, swingLimitZ: swing, twistLimit: 20 });
  const free = arm(3, '#4ab3e8');

  const kick = (): void => {
    const a = Math.random() * Math.PI * 2;
    for (const { body } of [limited, free]) body.rigidbody!.applyImpulse(new pc.Vec3(Math.cos(a) * 9, 0, Math.sin(a) * 9), new pc.Vec3(0, -1, 0));
  };
  every(app, 2.2, kick);

  // The swing limit is a cone around the arm: draw its rim and four edges.
  const rim = new pc.Vec3();
  const prev = new pc.Vec3();
  const edge = new pc.Color(1, 0.85, 0.3);
  app.on('update', () => {
    const lim = (limited.joint.enableLimits ? limited.joint.swingLimitY : 89) * pc.math.DEG_TO_RAD;
    const radius = Math.sin(lim) * LENGTH;
    const depth = Math.cos(lim) * LENGTH;
    for (let i = 0; i <= 24; i++) {
      const t = (i / 24) * Math.PI * 2;
      rim.set(limited.pivot.x + Math.cos(t) * radius, PIVOT_Y - depth, Math.sin(t) * radius);
      if (i) app.drawLine(prev, rim, edge, false);
      if (i % 6 === 0) app.drawLine(limited.pivot, rim, edge, false);
      prev.copy(rim);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('enableLimits (left arm)', true, (on) => (limited.joint.enableLimits = on));
    panel.slider('swing limit Y and Z', 5, 85, 1, swing, (v) => {
      swing = v;
      limited.joint.swingLimitY = v;
      limited.joint.swingLimitZ = v;
    });
    panel.slider('twist limit', 0, 90, 1, 20, (v) => (limited.joint.twistLimit = v));
    panel.row();
    panel.button('Kick both arms', kick);
  }

  return () => scene.dispose();
};

export default mount;
