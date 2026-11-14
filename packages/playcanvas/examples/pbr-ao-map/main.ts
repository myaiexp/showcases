// Ambient occlusion map: darkens the ambient and environment light in crevices
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { bricks, scalarMap } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  // Environment light only: AO affects ambient and reflections, not the direct sun.
  const rig = await createRig(el, ctx, { sun: false, distance: 7, pitch: -16, autoRotate: 12 });
  const { app, stage } = rig;

  // White where light reaches, dark in the mortar lines: this stands in for a baked AO map.
  const ao = rig.own(scalarMap(stage.device, (u, v) => 0.15 + 0.85 * Math.min(1, bricks(u, v) * 2), 256, 'ao-map'));
  const material = pbrMaterial('#d8cdb8', { gloss: 0.3, aoMap: ao, aoIntensity: 1 });
  addMesh(app, 'sphere', material, [-1.5, 0, 0], 2.6);
  addMesh(app, 'box', material, [1.6, 0, 0], 2.2);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('aoIntensity', 0, 2, 0.05, 1, (v) => {
      material.aoIntensity = v;
      material.update();
    });
    panel.slider('occludeSpecularIntensity', 0, 1, 0.05, 1, (v) => {
      material.occludeSpecularIntensity = v;
      material.update();
    });
    panel.check('aoMap', true, (on) => {
      material.aoMap = on ? ao : null;
      material.update();
    });
  }
  return () => rig.dispose();
};

export default mount;
