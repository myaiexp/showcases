// HDR rendering through CameraFrame: tone mapping and bloom
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const TONES = {
  TONEMAP_NEUTRAL: pc.TONEMAP_NEUTRAL,
  TONEMAP_ACES: pc.TONEMAP_ACES,
  TONEMAP_ACES2: pc.TONEMAP_ACES2,
  TONEMAP_AGX: pc.TONEMAP_AGX,
  TONEMAP_FILMIC: pc.TONEMAP_FILMIC,
  TONEMAP_LINEAR: pc.TONEMAP_LINEAR,
} as const;
type ToneName = keyof typeof TONES;

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 9, pitch: -12, autoRotate: 12, clearColor: new pc.Color(0.03, 0.035, 0.05) });
  const { app } = rig;
  app.scene.ambientLight = new pc.Color(0.1, 0.11, 0.14);

  // Neon bars: emissiveIntensity far above 1.0 is only meaningful when the frame is HDR.
  const colours = ['#ff3b6b', '#ffb02e', '#3bff9c', '#3ba6ff'];
  const bars = colours.map((hex, i) => {
    const m = pbrMaterial('#000000', { emissive: new pc.Color().fromString(hex), emissiveIntensity: 40 });
    return addMesh(app, 'capsule', m, [(i - 1.5) * 1.7, 0, 0], [0.45, 3, 0.45]);
  });
  addMesh(app, 'plane', pbrMaterial('#2a2f3c', { gloss: 0.5 }), [0, -1.6, 0], 14);
  addMesh(app, 'sphere', pbrMaterial('#d0d4dc', { gloss: 0.8 }), [0, -0.7, 1.8], 1.8);
  const pulse = (t: number): void => bars.forEach((b, i) => b.setLocalScale(0.45, 2.4 + Math.sin(t * 1.4 + i) * 0.5, 0.45));
  let t = 0;
  app.on('update', (dt: number) => pulse((t += dt)));

  // The CameraFrame owns the HDR pipeline: a floating-point render target, then tone mapping
  // and gamma correction as a full-screen pass. Settings take effect on update().
  const frame = new pc.CameraFrame(app, rig.camera.camera!);
  frame.rendering.toneMapping = pc.TONEMAP_NEUTRAL;
  frame.rendering.samples = 4;
  frame.bloom.intensity = 0.02;
  frame.update();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('bloom.intensity (0 = off)', 0, 0.1, 0.002, 0.02, (v) => {
      frame.bloom.intensity = v;
      frame.update();
    });
    panel.slider('bloom.blurLevel', 1, 16, 1, frame.bloom.blurLevel, (v) => {
      frame.bloom.blurLevel = v;
      frame.update();
    });
    panel.row();
    panel.select('rendering.toneMapping', Object.keys(TONES) as ToneName[], 'TONEMAP_NEUTRAL', (name) => {
      frame.rendering.toneMapping = TONES[name];
      frame.update();
    });
    panel.slider('vignette.intensity', 0, 1, 0.05, 0, (v) => {
      frame.vignette.intensity = v;
      frame.update();
    });
    panel.slider('emissiveIntensity', 1, 100, 1, 40, (v) =>
      bars.forEach((b) => {
        const m = b.render!.meshInstances[0]!.material as pc.StandardMaterial;
        m.emissiveIntensity = v;
        m.update();
      }),
    );
    panel.check('CameraFrame enabled', true, (on) => (frame.enabled = on));
  }
  return () => {
    frame.destroy();
    rig.dispose();
  };
};

export default mount;
