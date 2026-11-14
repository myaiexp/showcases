// Particle timing: rate, rate2, lifetime, numParticles, loop, autoPlay, preWarm
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 7, pitch: -8, autoRotate: 0 } });
  const { app } = scene;

  const emitter = new pc.Entity('emitter');
  emitter.setPosition(0, -2.5, 0);
  emitter.addComponent('particlesystem', {
    numParticles: 300,
    lifetime: 3,
    rate: 0.05,
    rate2: 0.05,
    loop: true,
    autoPlay: true,
    preWarm: false,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 0.2,
    localVelocityGraph: new pc.CurveSet([[0, 0], [0, 3.4], [0, 0]]), // up the local Y axis
    localVelocityGraph2: new pc.CurveSet([[0, 0], [0, 4.6], [0, 0]]),
    blendType: pc.BLEND_ADDITIVEALPHA,
    depthWrite: false,
    scaleGraph: new pc.Curve([0, 0.3, 1, 0.1]),
    alphaGraph: new pc.Curve([0, 1, 1, 0]),
    colorGraph: new pc.CurveSet([[0, 1, 1, 1], [0, 0.7, 1, 0.2], [0, 0.2, 1, 0.1]]),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  const out = ctx.preview ? null : createPanel(el);
  if (out) {
    const state = out.readout();
    app.on('update', () => (state.textContent = `isPlaying: ${ps.isPlaying()}   loop: ${ps.loop}`));
    out.slider('rate', 0.005, 0.5, 0.005, 0.05, (v) => {
      ps.rate = v;
      if (ps.rate2 < v) ps.rate2 = v;
    });
    out.slider('rate2', 0.005, 0.5, 0.005, 0.05, (v) => (ps.rate2 = Math.max(v, ps.rate)));
    out.slider('lifetime', 0.5, 6, 0.1, 3, (v) => (ps.lifetime = v));
    out.slider('numParticles', 20, 600, 10, 300, (v) => (ps.numParticles = v));
    out.row();
    out.check('loop', true, (on) => (ps.loop = on));
    out.check('preWarm (with loop)', false, (on) => ((ps.preWarm = on), ps.reset()));
    out.button('play()', () => ps.play());
    out.button('pause()', () => ps.pause());
    out.button('reset()', () => ps.reset());
    out.button('stop()', () => ps.stop());
    out.row();
    out.readout('A new particle is born every rate to rate2 seconds. Without loop, the system emits numParticles and stops.');
  }

  return () => scene.dispose();
};

export default mount;
