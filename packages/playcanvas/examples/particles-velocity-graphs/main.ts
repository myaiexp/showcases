// Particle velocity graphs: local, world, radial and rotation speed over a particle's life
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture } from '../../shared/textures.ts';

const MODES = ['localVelocityGraph', 'velocityGraph', 'radialSpeedGraph', 'rotationSpeedGraph'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 9, pitch: -10, autoRotate: 0 } });
  const { app } = scene;

  // An arrow, so rotation and facing show up (the default particle is a round dot).
  const arrow = canvasTexture(
    scene.stage.device,
    (g, s) => {
      g.clearRect(0, 0, s, s);
      g.fillStyle = '#fff';
      g.beginPath();
      g.moveTo(s * 0.5, s * 0.08);
      g.lineTo(s * 0.9, s * 0.55);
      g.lineTo(s * 0.62, s * 0.55);
      g.lineTo(s * 0.62, s * 0.92);
      g.lineTo(s * 0.38, s * 0.92);
      g.lineTo(s * 0.38, s * 0.55);
      g.lineTo(s * 0.1, s * 0.55);
      g.closePath();
      g.fill();
    },
    { size: 128, name: 'arrow', addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE },
  );

  // The emitter entity spins, so velocity in its local space and in the world differ.
  const holder = new pc.Entity('holder');
  app.root.addChild(holder);
  const emitter = new pc.Entity('emitter');
  emitter.addComponent('particlesystem', {
    numParticles: 160,
    lifetime: 2.4,
    rate: 0.03,
    rate2: 0.04,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 0.3,
    colorMap: arrow,
    blendType: pc.BLEND_NORMAL,
    scaleGraph: new pc.Curve([0, 0.5]),
    alphaGraph: new pc.Curve([0, 1, 0.8, 1, 1, 0]),
    colorGraph: new pc.CurveSet([[0, 0.3, 1, 1], [0, 0.8, 1, 0.5], [0, 1, 1, 0.3]]),
  });
  holder.addChild(emitter);
  const ps = emitter.particlesystem!;

  const apply = (mode: Mode): void => {
    // Reset all four, then set the one being shown.
    ps.localVelocityGraph = new pc.CurveSet([[0, 0], [0, 0], [0, 0]]);
    ps.velocityGraph = new pc.CurveSet([[0, 0], [0, 0], [0, 0]]);
    ps.radialSpeedGraph = new pc.Curve([0, 0]);
    ps.rotationSpeedGraph = new pc.Curve([0, 0]);
    if (mode === 'localVelocityGraph') ps.localVelocityGraph = new pc.CurveSet([[0, 0], [0, 2.8], [0, 0]]);
    if (mode === 'velocityGraph') ps.velocityGraph = new pc.CurveSet([[0, 2.2], [0, 0.5], [0, 0]]);
    if (mode === 'radialSpeedGraph') ps.radialSpeedGraph = new pc.Curve([0, 0.3, 1, 3.2]);
    if (mode === 'rotationSpeedGraph') {
      ps.localVelocityGraph = new pc.CurveSet([[0, 0], [0, 1.6], [0, 0]]);
      ps.rotationSpeedGraph = new pc.Curve([0, 360]);
    }
    ps.reset();
  };
  apply('localVelocityGraph');

  let t = 0;
  let mode: Mode = 'localVelocityGraph';
  app.on('update', (dt: number) => {
    t += dt;
    holder.setLocalPosition(0, -2, 0);
    holder.setLocalEulerAngles(0, 0, Math.sin(t * 0.9) * 70);
    if (ctx.preview) {
      const next = MODES[Math.floor(t / 4) % MODES.length]!;
      if (next !== mode) apply((mode = next));
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('graph in use', MODES, mode, (v) => apply((mode = v)));
    panel.row();
    panel.readout('The emitter swings from side to side. Local velocity follows it, world velocity does not, radial speed leaves the emitter centre.');
  }

  return () => {
    arrow.destroy();
    scene.dispose();
  };
};

export default mount;
