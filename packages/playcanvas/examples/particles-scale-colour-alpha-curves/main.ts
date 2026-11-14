// Particle scaleGraph, colorGraph and alphaGraph: Curve and CurveSet over a particle's life
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

// A Curve is a flat list of [time, value, time, value, ...] across the particle's life (0 to 1).
const SCALE: Record<string, () => pc.Curve> = {
  constant: () => new pc.Curve([0, 0.35]),
  'grow': () => new pc.Curve([0, 0.05, 1, 0.8]),
  'shrink': () => new pc.Curve([0, 0.7, 1, 0]),
  'pulse': () => new pc.Curve([0, 0.1, 0.25, 0.7, 0.5, 0.2, 0.75, 0.7, 1, 0.1]),
};
const ALPHA: Record<string, () => pc.Curve> = {
  'fade out': () => new pc.Curve([0, 1, 1, 0]),
  'fade in and out': () => new pc.Curve([0, 0, 0.2, 1, 0.7, 1, 1, 0]),
  opaque: () => new pc.Curve([0, 1]),
};
// A CurveSet holds one curve per channel; for colour they are r, g and b.
const COLOUR: Record<string, () => pc.CurveSet> = {
  fire: () => new pc.CurveSet([[0, 1, 1, 0.3], [0, 0.8, 0.5, 0.3, 1, 0.05], [0, 0.2, 0.4, 0.05, 1, 0]]),
  ice: () => new pc.CurveSet([[0, 0.7, 1, 0.1], [0, 0.95, 1, 0.5], [0, 1, 1, 1]]),
  rainbow: () => new pc.CurveSet([[0, 1, 0.33, 0.1, 0.66, 0.1, 1, 1], [0, 0.1, 0.33, 1, 0.66, 0.3, 1, 0.1], [0, 0.1, 0.33, 0.1, 0.66, 1, 1, 1]]),
  white: () => new pc.CurveSet([[0, 1], [0, 1], [0, 1]]),
};

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 7, pitch: -6, autoRotate: 0 } });
  const { app } = scene;

  const emitter = new pc.Entity('emitter');
  emitter.setPosition(0, -2.6, 0);
  emitter.addComponent('particlesystem', {
    numParticles: 260,
    lifetime: 2.6,
    rate: 0.01,
    rate2: 0.018,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 0.25,
    localVelocityGraph: new pc.CurveSet([[0, 0, 1, 0.4], [0, 3.6], [0, 0, 1, -0.4]]),
    localVelocityGraph2: new pc.CurveSet([[0, 0, 1, -0.4], [0, 4.4], [0, 0, 1, 0.4]]),
    blendType: pc.BLEND_ADDITIVEALPHA,
    depthWrite: false,
    scaleGraph: SCALE.shrink!(),
    colorGraph: COLOUR.fire!(),
    alphaGraph: ALPHA['fade out']!(),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  if (ctx.preview) {
    const scales = Object.keys(SCALE);
    const colours = Object.keys(COLOUR);
    let t = 0;
    let last = -1;
    app.on('update', (dt: number) => {
      t += dt;
      const step = Math.floor(t / 3);
      if (step === last) return;
      last = step;
      ps.scaleGraph = SCALE[scales[step % scales.length]!]!();
      ps.colorGraph = COLOUR[colours[step % colours.length]!]!();
    });
  } else {
    const panel = createPanel(el);
    panel.select('scaleGraph', Object.keys(SCALE), 'shrink', (v) => (ps.scaleGraph = SCALE[v]!()));
    panel.select('colorGraph', Object.keys(COLOUR), 'fire', (v) => (ps.colorGraph = COLOUR[v]!()));
    panel.select('alphaGraph', Object.keys(ALPHA), 'fade out', (v) => (ps.alphaGraph = ALPHA[v]!()));
    panel.row();
    panel.check('scaleGraph2: random lerp between two curves', false, (on) => (ps.scaleGraph2 = on ? new pc.Curve([0, 0.9, 1, 0.1]) : ps.scaleGraph));
    panel.readout('Each graph runs from birth (0) to death (1). A second graph makes each particle pick a blend of the two.');
  }

  return () => scene.dispose();
};

export default mount;
