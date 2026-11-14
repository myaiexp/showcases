// Particle orientation, particleNormal and lighting: billboards, planes, puffs
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture } from '../../shared/textures.ts';

const ORIENT: Record<string, number> = { screen: pc.PARTICLEORIENTATION_SCREEN, world: pc.PARTICLEORIENTATION_WORLD, emitter: pc.PARTICLEORIENTATION_EMITTER };

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: { angles: [30, 60, 0], intensity: 1.4 }, orbit: { distance: 8, pitch: -25, autoRotate: 16 }, floor: 12 });
  const { app } = scene;

  // A square with a border, so a flat particle's facing is easy to read.
  const tile = canvasTexture(
    scene.stage.device,
    (g, s) => {
      g.clearRect(0, 0, s, s);
      g.fillStyle = '#fff';
      g.fillRect(s * 0.1, s * 0.1, s * 0.8, s * 0.8);
      g.fillStyle = '#9aa0b0';
      g.fillRect(s * 0.2, s * 0.2, s * 0.6, s * 0.6);
    },
    { size: 128, name: 'tile', addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE },
  );

  const emitter = new pc.Entity('emitter');
  emitter.setPosition(0, 1.4, 0);
  emitter.setEulerAngles(0, 0, 30); // tilts the emitter normal, for 'emitter' orientation
  emitter.addComponent('particlesystem', {
    numParticles: 60,
    lifetime: 3,
    rate: 0.05,
    rate2: 0.05,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 1.6,
    initialVelocity: 0,
    colorMap: tile,
    orientation: pc.PARTICLEORIENTATION_SCREEN,
    particleNormal: new pc.Vec3(0, 1, 0),
    lighting: false,
    halfLambert: false,
    intensity: 1,
    blendType: pc.BLEND_NORMAL,
    depthWrite: true,
    scaleGraph: new pc.Curve([0, 0.7]),
    alphaGraph: new pc.Curve([0, 0, 0.1, 1, 0.9, 1, 1, 0]),
    colorGraph: new pc.CurveSet([[0, 1], [0, 0.6], [0, 0.35]]),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      const names = Object.keys(ORIENT);
      ps.orientation = ORIENT[names[Math.floor(t / 3) % 3]!]!;
      ps.lighting = Math.floor(t / 3) % 3 === 2;
    });
  } else {
    const panel = createPanel(el);
    panel.select('orientation', Object.keys(ORIENT), 'screen', (v) => (ps.orientation = ORIENT[v]!));
    panel.slider('particleNormal tilt', 0, 90, 1, 0, (v) => (ps.particleNormal = new pc.Vec3(Math.sin((v * Math.PI) / 180), Math.cos((v * Math.PI) / 180), 0)));
    panel.row();
    panel.check('lighting', false, (on) => (ps.lighting = on));
    panel.check('halfLambert', false, (on) => (ps.halfLambert = on));
    panel.slider('intensity', 0, 3, 0.05, 1, (v) => (ps.intensity = v));
    panel.row();
    panel.readout('Screen faces the camera; world and emitter use particleNormal in world or emitter space. Lighting uses the scene sun and ambient.');
  }

  return () => {
    tile.destroy();
    scene.dispose();
  };
};

export default mount;
