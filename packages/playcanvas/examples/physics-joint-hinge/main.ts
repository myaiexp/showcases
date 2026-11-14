// A door on a hinge joint: the joint entity sets the axis and pivot
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every } from '../../shared/physics.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 10, pitch: -35, target: [0.8, 1.6, 0], floor: 12, yaw: 35, autoRotate: 3 });
  const { app } = scene;
  let opening = true;

  const frame = addBody(app, { type: 'static', name: 'frame', size: [0.3, 3.2, 0.3], position: [-0.15, 1.6, 0], colour: '#59627a' });
  const door = addBody(app, { name: 'door', size: [2, 3, 0.15], position: [1, 1.6, 0], colour: '#e8794a', body: { mass: 3, angularDamping: 0.2 } });

  // The joint lives on its own entity: its position is the pivot and its local X axis is the hinge axis.
  const hinge = new pc.Entity('hinge');
  hinge.setPosition(0, 1.6, 0);
  hinge.setEulerAngles(0, 0, 90); // local X now points up
  app.root.addChild(hinge);
  hinge.addComponent('joint', {
    type: pc.JOINTTYPE_HINGE,
    entityA: door,
    entityB: frame,
    enableLimits: true,
    limits: new pc.Vec2(0, 110),
  });
  const joint = hinge.joint!;

  // A push at the free edge: -Z swings this door open (positive angle about +Y), +Z closes it.
  const push = (): void => {
    door.rigidbody!.applyImpulse(new pc.Vec3(0, 0, opening ? -6 : 6), new pc.Vec3(0.9, 0, 0));
    opening = !opening;
  };
  every(app, 2.5, push);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('enableLimits', true, (on) => (joint.enableLimits = on));
    // Limits are live: the upper limit is measured from where the door started.
    panel.slider('upper limit (degrees)', 10, 170, 5, 110, (v) => (joint.limits = new pc.Vec2(0, v)));
    panel.row();
    panel.button('Push', push);
    panel.readout('Without enableLimits the limits are ignored and the door swings freely.');
  }

  return () => scene.dispose();
};

export default mount;
