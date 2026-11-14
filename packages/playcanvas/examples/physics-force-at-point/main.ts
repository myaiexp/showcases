// Off-centre forces and impulses spin a body; each measures its point apart
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addShape, material } from '../../shared/components.ts';
import { createPhysicsScene, every, respawn } from '../../shared/physics.ts';

const FORCE_SECONDS = 0.15;
const IMPULSE = 3;

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, pitch: -55, target: [0, 1.5, 0], floor: 16, autoRotate: 0, yaw: 0 });
  const { app } = scene;
  let offset = 1;
  let elapsed = 99;

  // Weightless and lightly damped, so the push and spin are all that is left to look at. The body
  // entity keeps scale 1 (transformVector below would pick the scale up); a child draws the bar.
  const make = (x: number, colour: string, name: string): pc.Entity => {
    const e = new pc.Entity(name);
    e.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(1.3, 0.2, 0.25) });
    e.addComponent('rigidbody', { type: 'dynamic', mass: 1, gravityScale: 0, linearDamping: 0.5, angularDamping: 0.4 });
    const bar = addShape(e, 'box', material(colour), [0, 0, 0], [2.6, 0.4, 0.5], 'bar');
    bar.render!.castShadows = true;
    addShape(e, 'sphere', material('#ffffff', { emissive: '#ffffff' }), [0, 0.3, 0], 0.4, 'marker');
    e.setPosition(x, 1.5, 0);
    app.root.addChild(e);
    return e;
  };
  const byImpulse = make(-5, '#4ab3e8', 'applyImpulse at local point');
  const byForce = make(0, '#e8794a', 'applyForce at world offset');
  const centred = make(5, '#7bc67b', 'no point');

  const place = (): void => {
    byImpulse.findByName('marker')!.setLocalPosition(offset, 0.3, 0);
    byForce.findByName('marker')!.setLocalPosition(offset, 0.3, 0);
    centred.findByName('marker')!.setLocalPosition(0, 0.3, 0);
  };
  place();

  const local = new pc.Vec3();
  const world = new pc.Vec3();
  const launch = (): void => {
    for (const [e, x] of [[byImpulse, -5], [byForce, 0], [centred, 5]] as const) respawn(e, [x, 1.5, 0], [0, 40, 0]);
    elapsed = 0;
    local.set(offset, 0, 0);
    // applyImpulse takes the point in the entity's local space.
    byImpulse.rigidbody!.applyImpulse(new pc.Vec3(0, 0, IMPULSE), local);
    centred.rigidbody!.applyImpulse(0, 0, IMPULSE);
  };

  app.on('update', (dt: number) => {
    elapsed += dt;
    if (elapsed > FORCE_SECONDS) return;
    // applyForce takes the point as a world space offset from the body, so turn the local point into one.
    local.set(offset, 0, 0);
    byForce.getWorldTransform().transformVector(local, world);
    byForce.rigidbody!.applyForce(new pc.Vec3(0, 0, IMPULSE / FORCE_SECONDS), world);
  });
  launch();
  every(app, 5, launch);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('point along the bar (m)', -1.2, 1.2, 0.1, offset, (v) => {
      offset = v;
      place();
      launch();
    });
    panel.button('Push again', launch);
    panel.row();
    panel.readout('blue: impulse at a local point   orange: force at a world offset   green: through the centre');
  }

  return () => scene.dispose();
};

export default mount;
