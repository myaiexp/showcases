// Particle localSpace and wrap: a moving emitter leaves a trail or carries it
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 11, pitch: -28, autoRotate: 0 }, floor: 16 });
  const { app } = scene;

  const carrier = new pc.Entity('carrier');
  app.root.addChild(carrier);
  addShape(carrier, 'sphere', material('#000000', { emissive: '#ffd89a' }), [0, 0, 0], 0.4).render!.castShadows = false;
  carrier.addComponent('particlesystem', {
    numParticles: 200,
    lifetime: 2.2,
    rate: 0.02,
    rate2: 0.02,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 0.3,
    localSpace: false,
    wrap: false,
    wrapBounds: new pc.Vec3(3, 3, 3),
    blendType: pc.BLEND_ADDITIVEALPHA,
    depthWrite: false,
    scaleGraph: new pc.Curve([0, 0.4, 1, 0.1]),
    alphaGraph: new pc.Curve([0, 1, 1, 0]),
    colorGraph: new pc.CurveSet([[0, 1, 1, 0.3], [0, 0.7, 1, 0.3], [0, 0.2, 1, 0.9]]),
    localVelocityGraph: new pc.CurveSet([[0, 0], [0, 0.6], [0, 0]]),
  });
  const ps = carrier.particlesystem!;

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    // The emitter travels in a loop; world-space particles stay where they were born.
    carrier.setPosition(Math.cos(t * 0.9) * 4, 1 + Math.sin(t * 1.8) * 0.5, Math.sin(t * 0.9) * 3);
    if (ctx.preview) ps.localSpace = Math.floor(t / 4) % 2 === 1;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('localSpace', false, (on) => (ps.localSpace = on));
    panel.check('wrap', false, (on) => (ps.wrap = on));
    panel.slider('wrapBounds', 1, 10, 0.5, 3, (v) => (ps.wrapBounds = new pc.Vec3(v, v, v)));
    panel.row();
    panel.readout('World space leaves a trail behind the moving emitter; local space moves the whole cloud with it. Wrap teleports particles that leave the box around the emitter.');
  }

  return () => scene.dispose();
};

export default mount;
