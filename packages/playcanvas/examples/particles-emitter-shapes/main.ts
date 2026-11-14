// Particle emitter shape: box extents or sphere radius, with a hollow core
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 9, pitch: -20, autoRotate: 14 } });
  const { app } = scene;

  const emitter = new pc.Entity('emitter');
  emitter.addComponent('particlesystem', {
    numParticles: 900,
    lifetime: 1.6,
    rate: 0.002,
    rate2: 0.002,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 2.2,
    emitterRadiusInner: 1.2,
    emitterExtents: new pc.Vec3(2.5, 1, 1.5),
    emitterExtentsInner: new pc.Vec3(1.5, 0.4, 0.6),
    initialVelocity: 0,
    blendType: pc.BLEND_ADDITIVEALPHA,
    depthWrite: false,
    scaleGraph: new pc.Curve([0, 0.25]),
    alphaGraph: new pc.Curve([0, 0, 0.15, 1, 0.8, 1, 1, 0]),
    colorGraph: new pc.CurveSet([[0, 1, 1, 0.3], [0, 0.7, 1, 0.8], [0, 0.2, 1, 1]]),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) {
      const box = Math.floor(t / 4) % 2 === 1;
      if (ps.emitterShape !== (box ? pc.EMITTERSHAPE_BOX : pc.EMITTERSHAPE_SPHERE)) ps.emitterShape = box ? pc.EMITTERSHAPE_BOX : pc.EMITTERSHAPE_SPHERE;
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('emitterShape', ['sphere', 'box'], 'sphere', (v) => (ps.emitterShape = v === 'box' ? pc.EMITTERSHAPE_BOX : pc.EMITTERSHAPE_SPHERE));
    panel.row();
    panel.slider('emitterRadius (sphere)', 0.2, 4, 0.1, 2.2, (v) => (ps.emitterRadius = v));
    panel.slider('emitterRadiusInner', 0, 4, 0.1, 1.2, (v) => (ps.emitterRadiusInner = v));
    panel.row();
    panel.slider('emitterExtents x (box)', 0.2, 4, 0.1, 2.5, (v) => (ps.emitterExtents = new pc.Vec3(v, ps.emitterExtents.y, ps.emitterExtents.z)));
    panel.slider('emitterExtentsInner x', 0, 4, 0.1, 1.5, (v) => (ps.emitterExtentsInner = new pc.Vec3(v, ps.emitterExtentsInner.y, ps.emitterExtentsInner.z)));
    panel.row();
    panel.readout('Particles spawn between the inner and outer volume; radius and extents are half sizes.');
  }

  return () => scene.dispose();
};

export default mount;
