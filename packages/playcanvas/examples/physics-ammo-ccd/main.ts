// Calling ammo.js directly: continuous collision detection on the native body
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, respawn } from '../../shared/physics.ts';

const TRAIL = 14;

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 13, pitch: -22, yaw: 62, target: [0, 1.5, 0], floor: 20, autoRotate: 2 });
  const { app, physics } = scene;
  let speed = 80;
  let ccd = true;
  let readout: HTMLElement | null = null;
  // Slow motion only so the eye can follow; each fixed step still moves a bullet the same distance.
  physics.timeScale = 0.15;

  const lanes = [-3, 3].map((x) => {
    addBody(app, { type: 'static', name: 'wall', size: [4, 3, 0.1], position: [x, 1.5, 0], colour: '#59627a' });
    const bullet = addBody(app, { shape: 'sphere', name: 'bullet', size: 0.3, colour: x < 0 ? '#e8794a' : '#7bc67b', body: { mass: 0.2, gravityScale: 0, restitution: 0.3 } });
    return { x, bullet, trail: [] as pc.Vec3[] };
  });

  const configure = (): void => {
    const { bullet } = lanes[1]!;
    // Fetch the native body when needed: the engine rebuilds it when the type or shape changes.
    const body = bullet.rigidbody!.body;
    if (!body) return;
    // Bullet enables CCD only above a motion threshold; 0 switches it off again.
    body.setCcdMotionThreshold(ccd ? 0.1 : 0);
    body.setCcdSweptSphereRadius(0.1);
  };

  const fire = (): void => {
    for (const lane of lanes) {
      respawn(lane.bullet, [lane.x, 1.5, 9]);
      lane.bullet.rigidbody!.linearVelocity = new pc.Vec3(0, 0, -speed);
      lane.trail.length = 0;
    }
    configure();
  };
  fire();
  every(app, 3, fire);

  app.on('update', () => {
    for (const lane of lanes) {
      lane.trail.push(lane.bullet.getPosition().clone());
      if (lane.trail.length > TRAIL) lane.trail.shift();
      for (let i = 1; i < lane.trail.length; i++) app.drawLine(lane.trail[i - 1]!, lane.trail[i]!, lane.x < 0 ? pc.Color.RED : pc.Color.GREEN, false);
    }
    if (readout) {
      const v = lanes[1]!.bullet.rigidbody!.body?.getLinearVelocity();
      const native = v ? Math.hypot(v.x(), v.y(), v.z()) : 0;
      readout.textContent = `native getLinearVelocity of the CCD bullet: ${native.toFixed(1)} m/s`;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('bullet speed (m/s)', 20, 150, 5, speed, (v) => (speed = v));
    panel.check('CCD on the right bullet', ccd, (on) => ((ccd = on), fire()));
    panel.button('Fire', fire);
    panel.row();
    readout = panel.readout();
    panel.readout('left bullet: components only, right bullet: setCcdMotionThreshold + setCcdSweptSphereRadius');
  }

  return () => scene.dispose();
};

export default mount;
