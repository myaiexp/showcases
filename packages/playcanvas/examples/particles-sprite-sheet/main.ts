// Particle sprite sheet: tiles, animation index, frame count, speed and loop
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { canvasTexture } from '../../shared/textures.ts';

const TILES = 4; // a 4 x 4 sheet: two animations of eight frames

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { sun: false, orbit: { distance: 8, pitch: -5, autoRotate: 0 } });
  const { app } = scene;

  // Frames 0-7 (animation 0, orange) and 8-15 (animation 1, blue): a wedge sweeping round a ring.
  const sheet = canvasTexture(
    scene.stage.device,
    (g, s) => {
      g.clearRect(0, 0, s, s);
      const c = s / TILES;
      for (let f = 0; f < TILES * TILES; f++) {
        const x = (f % TILES) * c + c / 2;
        const y = Math.floor(f / TILES) * c + c / 2;
        const step = f % 8;
        g.fillStyle = f < 8 ? '#ff9a3c' : '#4ab3ff';
        g.beginPath();
        g.moveTo(x, y);
        g.arc(x, y, c * 0.42, -Math.PI / 2, -Math.PI / 2 + ((step + 1) / 8) * Math.PI * 2);
        g.closePath();
        g.fill();
        g.strokeStyle = '#fff';
        g.lineWidth = 3;
        g.beginPath();
        g.arc(x, y, c * 0.42, 0, Math.PI * 2);
        g.stroke();
      }
    },
    { size: 512, name: 'sheet', addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE },
  );

  const emitter = new pc.Entity('emitter');
  emitter.setPosition(0, -2.4, 0);
  emitter.addComponent('particlesystem', {
    numParticles: 40,
    lifetime: 3,
    rate: 0.25,
    rate2: 0.25,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 0.8,
    colorMap: sheet,
    animTilesX: TILES,
    animTilesY: TILES,
    animNumAnimations: 2,
    animNumFrames: 8,
    animIndex: 0,
    randomizeAnimIndex: false,
    animStartFrame: 0,
    animSpeed: 2.6,
    animLoop: true,
    blendType: pc.BLEND_NORMAL,
    scaleGraph: new pc.Curve([0, 1.2]),
    alphaGraph: new pc.Curve([0, 0, 0.1, 1, 0.9, 1, 1, 0]),
    localVelocityGraph: new pc.CurveSet([[0, 0], [0, 1.6], [0, 0]]),
  });
  app.root.addChild(emitter);
  const ps = emitter.particlesystem!;

  if (ctx.preview) {
    ps.randomizeAnimIndex = true;
  } else {
    const panel = createPanel(el);
    panel.select('animIndex', ['0', '1'], '0', (v) => (ps.animIndex = Number(v)));
    panel.check('randomizeAnimIndex', false, (on) => (ps.randomizeAnimIndex = on));
    panel.check('animLoop', true, (on) => (ps.animLoop = on));
    panel.slider('animSpeed', 0.2, 8, 0.1, 2.6, (v) => (ps.animSpeed = v));
    panel.slider('animNumFrames', 1, 8, 1, 8, (v) => (ps.animNumFrames = v));
    panel.slider('animStartFrame', 0, 7, 1, 0, (v) => (ps.animStartFrame = v));
    panel.row();
    panel.readout('The colour map is read as a grid of tiles; each particle steps through the frames of its animation as it ages.');
  }

  return () => {
    sheet.destroy();
    scene.dispose();
  };
};

export default mount;
