// Anisotropic specular on brushed metal: intensity and rotation
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 7, pitch: -14, autoRotate: 12 });
  const { app } = rig;

  // Anisotropy needs the GGX specular model; intensity 0 is the ordinary round highlight.
  const aniso = pbrMaterial('#c9ccd2', { metalness: 1, gloss: 0.72, enableGGXSpecular: true, anisotropyIntensity: 0.9, anisotropyRotation: 0 });
  const plain = pbrMaterial('#c9ccd2', { metalness: 1, gloss: 0.72, enableGGXSpecular: true, anisotropyIntensity: 0 });
  addMesh(app, 'sphere', plain, [-2.6, 0, 0], 2.2);
  addMesh(app, 'sphere', aniso, [0, 0, 0], 2.2);
  addMesh(app, 'torus', aniso, [2.9, 0, 0], 2.4).setLocalEulerAngles(70, 0, 0);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('anisotropyIntensity', 0, 1, 0.01, 0.9, (v) => {
      aniso.anisotropyIntensity = v;
      aniso.update();
    });
    panel.slider('anisotropyRotation (deg)', 0, 180, 1, 0, (v) => {
      aniso.anisotropyRotation = v;
      aniso.update();
    });
    panel.slider('gloss', 0.3, 1, 0.01, 0.72, (v) => {
      aniso.gloss = plain.gloss = v;
      aniso.update();
      plain.update();
    });
    panel.readout('left sphere: anisotropyIntensity 0');
  }
  return () => rig.dispose();
};

export default mount;
