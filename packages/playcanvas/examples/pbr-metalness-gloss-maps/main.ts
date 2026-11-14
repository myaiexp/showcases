// Metalness and gloss maps painted in code, with glossInvert for roughness data
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { scalarMap, tileNoise } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 6.5, pitch: -18, autoRotate: 14 });
  const { app, stage } = rig;

  // Metalness is a binary mask: metal squares and non-metal squares (docs: usually 0 or 1).
  const metalMap = rig.own(scalarMap(stage.device, (u, v) => ((Math.floor(u * 6) + Math.floor(v * 6)) % 2 ? 1 : 0), 128, 'metalness-map'));
  // Gloss varies smoothly: rough blotches on a smooth surface.
  const glossMap = rig.own(scalarMap(stage.device, (u, v) => 0.25 + 0.75 * tileNoise(u, v, 5), 128, 'gloss-map'));

  const material = pbrMaterial('#d9a46a', { metalnessMap: metalMap, glossMap, gloss: 1, metalness: 1 });
  addMesh(app, 'sphere', material, [-1.4, 0, 0], 2.4);
  addMesh(app, 'box', material, [1.5, 0, 0], 2);
  const apply = (): void => material.update();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('metalnessMap', true, (on) => {
      material.metalnessMap = on ? metalMap : null;
      material.metalness = on ? 1 : 0;
      apply();
    });
    panel.check('glossMap', true, (on) => {
      material.glossMap = on ? glossMap : null;
      apply();
    });
    panel.check('glossInvert (map holds roughness)', false, (on) => {
      material.glossInvert = on;
      apply();
    });
    panel.slider('gloss multiplier', 0, 1, 0.01, 1, (v) => {
      material.gloss = v;
      apply();
    });
    panel.select('diffuse', ['gold', 'copper', 'plastic red'], 'gold', (name) => {
      material.diffuse = new pc.Color().fromString(name === 'gold' ? '#d9a46a' : name === 'copper' ? '#d98f78' : '#c8402e');
      apply();
    });
  }
  return () => rig.dispose();
};

export default mount;
