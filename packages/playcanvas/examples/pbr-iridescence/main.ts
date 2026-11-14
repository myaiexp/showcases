// Iridescence: thin-film colour shifts from useIridescence, thickness and index
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { scalarMap, tileNoise } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 6.5, pitch: -14, autoRotate: 16 });
  const { app, stage } = rig;

  const material = pbrMaterial('#202428', { gloss: 0.9, metalness: 0.6, useIridescence: true, iridescence: 1, iridescenceRefractionIndex: 1.4, iridescenceThicknessMin: 250, iridescenceThicknessMax: 650 });
  addMesh(app, 'sphere', material, [-1.5, 0, 0], 2.6);
  addMesh(app, 'torus', material, [1.7, 0, 0], 2.4).setLocalEulerAngles(60, 0, 0);

  // A thickness map varies the film per pixel between iridescenceThicknessMin and Max.
  const thickness = rig.own(scalarMap(stage.device, (u, v) => tileNoise(u, v, 3), 128, 'film-thickness'));
  const apply = (): void => material.update();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('iridescence', 0, 1, 0.01, 1, (v) => {
      material.iridescence = v;
      apply();
    });
    panel.slider('refraction index', 1, 2.5, 0.01, 1.4, (v) => {
      material.iridescenceRefractionIndex = v;
      apply();
    });
    panel.slider('thickness min (nm)', 0, 800, 10, 250, (v) => {
      material.iridescenceThicknessMin = v;
      apply();
    });
    panel.slider('thickness max (nm)', 0, 1200, 10, 650, (v) => {
      material.iridescenceThicknessMax = v;
      apply();
    });
    panel.check('iridescenceThicknessMap', false, (on) => {
      material.iridescenceThicknessMap = on ? thickness : null;
      apply();
    });
    panel.check('useIridescence', true, (on) => {
      material.useIridescence = on;
      apply();
    });
  }
  return () => rig.dispose();
};

export default mount;
