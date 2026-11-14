// Slider joints: motors drive a block and a lift between limits
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every } from '../../shared/physics.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, pitch: -28, target: [0, 1.5, 0], floor: 14, yaw: 20, autoRotate: 3 });
  const { app } = scene;
  let force = 400;
  let slideSpeed = 2;
  let liftSpeed = 1.5;

  // A slider joint on its own entity: translation along that entity's local X axis, from the start pose.
  const slider = (at: [number, number, number], euler: [number, number, number], body: pc.Entity, limits: [number, number], speed: number): pc.JointComponent => {
    const e = new pc.Entity('slider');
    e.setPosition(...at);
    e.setEulerAngles(...euler);
    app.root.addChild(e);
    e.addComponent('joint', {
      type: pc.JOINTTYPE_SLIDER,
      entityA: body,
      enableLimits: true,
      limits: new pc.Vec2(...limits),
      motorSpeed: speed,
      maxMotorForce: force,
    });
    return e.joint!;
  };

  addBody(app, { type: 'static', name: 'rail', size: [7, 0.2, 0.3], position: [0, 0.85, -2], colour: '#59627a' });
  const block = addBody(app, { name: 'block', size: [1.2, 0.7, 1.2], position: [0, 1.3, -2], colour: '#e8794a', body: { mass: 5 } });
  const slide = slider([0, 1.3, -2], [0, 0, 0], block, [-3, 3], slideSpeed);

  for (const x of [2.8, 5.2]) addBody(app, { type: 'static', name: 'post', size: [0.3, 4, 0.3], position: [x, 2, 2], colour: '#59627a' });
  const lift = addBody(app, { name: 'lift', size: [1.6, 0.3, 1.6], position: [4, 0.4, 2], colour: '#4ab3e8', body: { mass: 5 } });
  const raise = slider([4, 0.4, 2], [0, 0, 90], lift, [0, 3], liftSpeed); // local X now points up

  // Reverse both motors; against a stop the motor simply stalls.
  every(app, 2.6, () => {
    slideSpeed = -slideSpeed;
    liftSpeed = -liftSpeed;
    slide.motorSpeed = slideSpeed;
    raise.motorSpeed = liftSpeed;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('block motorSpeed (m/s)', -4, 4, 0.5, slideSpeed, (v) => ((slideSpeed = v), (slide.motorSpeed = v)));
    panel.slider('lift motorSpeed (m/s)', -4, 4, 0.5, liftSpeed, (v) => ((liftSpeed = v), (raise.motorSpeed = v)));
    panel.slider('maxMotorForce (0 = motor off)', 0, 600, 10, force, (v) => {
      force = v;
      slide.maxMotorForce = v;
      raise.maxMotorForce = v;
    });
  }

  return () => scene.dispose();
};

export default mount;
