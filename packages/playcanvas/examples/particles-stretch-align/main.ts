// Particle stretch and alignToMotion: streaks along velocity and arrows that face their flight
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 9, pitch: 0, yaw: 0, autoRotate: 0 } });
  const { app } = scene;

  // A teardrop pointing up the texture, so aligning to motion has a visible front.
  const drop = canvasTexture(
    scene.stage.device,
    (g, s) => {
      g.clearRect(0, 0, s, s);
      const grad = g.createLinearGradient(0, s * 0.95, 0, s * 0.05);
      grad.addColorStop(0, 'rgba(255,140,40,0)');
      grad.addColorStop(0.6, 'rgba(255,200,90,0.9)');
      grad.addColorStop(1, 'rgba(255,255,255,1)');
      g.fillStyle = grad;
      g.beginPath();
      g.moveTo(s * 0.5, s * 0.05);
      g.quadraticCurveTo(s * 0.9, s * 0.7, s * 0.5, s * 0.95);
      g.quadraticCurveTo(s * 0.1, s * 0.7, s * 0.5, s * 0.05);
      g.fill();
    },
    { size: 128, name: 'drop', addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE },
  );

  // Particles fly out in a fan, fast, with gravity pulling them into arcs.
  const emitter = new pc.Entity('emitter');
  emitter.setPosition(0, -2.6, 0);
  emitter.addComponent('particlesystem', {
    numParticles: 140,
    lifetime: 2,
    rate: 0.02,
    rate2: 0.03,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 0.2,
    colorMap: drop,
    blendType: pc.BLEND_ADDITIVEALPHA,
    depthWrite: false,
    stretch: 0,
    alignToMotion: false,
    scaleGraph: new pc.Curve([0, 0.45]),
    alphaGraph: new pc.Curve([0, 1, 0.7, 1, 1, 0]),
    localVelocityGraph: new pc.CurveSet([[0, -1.4, 1, 1.4], [0, 5.5, 0.5, 2.5, 1, -2], [0, 0]]),
    localVelocityGraph2: new pc.CurveSet([[0, 1.4, 1, -1.4], [0, 6.5, 0.5, 3.2, 1, -3], [0, 0]]),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      const step = Math.floor(t / 2.5) % 4;
      ps.stretch = step % 2 ? 0.4 : 0;
      ps.alignToMotion = step >= 2;
    });
  } else {
    const panel = createPanel(el);
    panel.slider('stretch', 0, 1, 0.01, 0, (v) => (ps.stretch = v));
    panel.check('alignToMotion', false, (on) => (ps.alignToMotion = on));
    panel.row();
    panel.readout('Stretch pulls each particle back toward where it was; alignToMotion turns it to face its direction of travel.');
  }

  return () => {
    drop.destroy();
    scene.dispose();
  };
};

export default mount;
