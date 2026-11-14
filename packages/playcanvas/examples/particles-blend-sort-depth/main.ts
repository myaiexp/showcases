// Particle blendType, sort and depthWrite: how overlapping particles composite
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const BLENDS: Record<string, number> = { alpha: pc.BLEND_NORMAL, additive: pc.BLEND_ADDITIVEALPHA, multiply: pc.BLEND_MULTIPLICATIVE };
const SORTS: Record<string, number> = { none: pc.PARTICLESORT_NONE, 'camera distance': pc.PARTICLESORT_DISTANCE, 'newest first': pc.PARTICLESORT_NEWER_FIRST, 'oldest first': pc.PARTICLESORT_OLDER_FIRST };

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 7, pitch: -15, autoRotate: 16 }, clear: '#3a4258' });
  const { app } = scene;
  // A bright box behind the cloud, so multiply and additive have something to act on.
  addShape(app.root, 'box', material('#f2c14e'), [0, 0, -2.4], [6, 3, 0.2]);

  const emitter = new pc.Entity('emitter');
  emitter.addComponent('particlesystem', {
    numParticles: 120,
    lifetime: 3,
    rate: 0.03,
    rate2: 0.03,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 1.2,
    initialVelocity: 0,
    blendType: pc.BLEND_NORMAL,
    sort: pc.PARTICLESORT_NONE,
    depthWrite: false,
    scaleGraph: new pc.Curve([0, 1.4]),
    alphaGraph: new pc.Curve([0, 0, 0.2, 0.8, 0.8, 0.8, 1, 0]),
    colorGraph: new pc.CurveSet([[0, 1, 1, 0.9], [0, 0.35, 1, 0.9], [0, 0.3, 1, 0.9]]),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  if (ctx.preview) {
    const keys = Object.keys(BLENDS);
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      ps.blendType = BLENDS[keys[Math.floor(t / 3) % keys.length]!]!;
    });
  } else {
    const panel = createPanel(el);
    panel.select('blendType', Object.keys(BLENDS), 'alpha', (v) => (ps.blendType = BLENDS[v]!));
    panel.select('sort', Object.keys(SORTS), 'none', (v) => (ps.sort = SORTS[v]!));
    panel.check('depthWrite', false, (on) => (ps.depthWrite = on));
    panel.row();
    panel.readout('Additive adds light, multiply darkens what is behind. Sort and depthWrite change who covers whom.');
  }

  return () => scene.dispose();
};

export default mount;
