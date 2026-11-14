// Clear coat: a glossy second layer with its own normal map
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { bumps, normalMap } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 7, pitch: -14, autoRotate: 14 });
  const { app, stage } = rig;

  // A rough, coloured base with a bumpy normal map under a smooth coat.
  const bump = rig.own(normalMap(stage.device, bumps, 3, 128, 'base-bumps'));
  const material = pbrMaterial('#9b1b2a', { gloss: 0.35, normalMap: bump, normalMapTiling: new pc.Vec2(3, 3), bumpiness: 1.5, clearCoat: 1, clearCoatGloss: 0.95 });
  addMesh(app, 'sphere', material, [-1.5, 0, 0], 2.6);
  // The same base without a coat, for comparison.
  addMesh(app, 'sphere', pbrMaterial('#9b1b2a', { gloss: 0.35, normalMap: bump, normalMapTiling: new pc.Vec2(3, 3), bumpiness: 1.5 }), [1.5, 0, 0], 2.6);

  const apply = (): void => material.update();
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('clearCoat', 0, 1, 0.01, 1, (v) => {
      material.clearCoat = v;
      apply();
    });
    panel.slider('clearCoatGloss', 0, 1, 0.01, 0.95, (v) => {
      material.clearCoatGloss = v;
      apply();
    });
    panel.slider('clearCoatBumpiness', 0, 2, 0.05, 1, (v) => {
      material.clearCoatBumpiness = v;
      apply();
    });
    // A separate normal map for the coat layer: the coat can be bumpy while the base is not.
    const coatBump = rig.own(normalMap(stage.device, bumps, 2, 128, 'coat-bumps'));
    panel.check('clearCoatNormalMap', false, (on) => {
      material.clearCoatNormalMap = on ? coatBump : null;
      apply();
    });
    panel.readout('left: coated, right: base only');
  }
  return () => rig.dispose();
};

export default mount;
