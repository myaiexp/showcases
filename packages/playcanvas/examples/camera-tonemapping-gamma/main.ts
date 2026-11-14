// Camera toneMapping and gammaCorrection: one HDR scene through six cameras side by side
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const MODES: [string, number][] = [
  ['Linear', pc.TONEMAP_LINEAR],
  ['Filmic', pc.TONEMAP_FILMIC],
  ['Hejl', pc.TONEMAP_HEJL],
  ['ACES', pc.TONEMAP_ACES],
  ['ACES2', pc.TONEMAP_ACES2],
  ['Neutral', pc.TONEMAP_NEUTRAL],
];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: false, sun: { intensity: 3.5, angles: [40, 35, 0] }, ambient: '#505868' });
  const { app, camera } = scene;
  const first = camera.camera!;

  // The same pose for every camera, each drawing one sixth of the canvas.
  const cameras = MODES.map(([, mode], i) => {
    const entity = i === 0 ? camera : new pc.Entity(`camera-${i}`);
    if (i > 0) {
      entity.addComponent('camera', { clearColor: first.clearColor });
      camera.addChild(entity);
    }
    const c = entity.camera!;
    c.rect = new pc.Vec4(i / MODES.length, 0, 1 / MODES.length, 1);
    c.toneMapping = mode;
    c.fov = 60;
    c.aspectRatioMode = pc.ASPECT_AUTO;
    return c;
  });
  camera.setPosition(0, 1.2, 3.2);
  camera.lookAt(0, 0.6, 0);

  const colours = ['#ff6a3c', '#ffd23c', '#4cff7a', '#3cb4ff'];
  const spheres = colours.map((c, i) => addShape(app.root, 'sphere', material(c, { gloss: 0.8, metalness: 0.1 }), [(i - 1.5) * 1.05, 0.5, 0], 0.9));
  addShape(app.root, 'plane', material('#d8dce4'), [0, 0, 0], [8, 1, 8]);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    spheres.forEach((s, i) => s.setLocalPosition((i - 1.5) * 1.05, 0.5 + Math.abs(Math.sin(t * 2 + i)) * 0.5, 0));
  });

  const labels = document.createElement('div');
  Object.assign(labels.style, { display: 'grid', gridTemplateColumns: `repeat(${MODES.length}, 1fr)`, textAlign: 'center', fontSize: '0.8rem', color: 'var(--fg-2)', padding: '2px 0' });
  for (const [name] of MODES) labels.append(Object.assign(document.createElement('span'), { textContent: name }));
  if (!ctx.preview) el.append(labels);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('gammaCorrection', ['GAMMA_SRGB (2.2)', 'GAMMA_NONE (1.0)'], 'GAMMA_SRGB (2.2)', (v) => cameras.forEach((c) => (c.gammaCorrection = v.startsWith('GAMMA_NONE') ? pc.GAMMA_NONE : pc.GAMMA_SRGB)));
    panel.slider('sun intensity', 0.5, 10, 0.1, 3.5, (v) => (scene.sun!.light!.intensity = v));
  }

  return () => scene.dispose();
};

export default mount;
