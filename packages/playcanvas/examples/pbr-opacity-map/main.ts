// Opacity map: per-pixel transparency from a texture, blended or cut out
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { scalarMap, tileNoise } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const MODES = ['blend', 'alphaTest 0.5'] as const;

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 7, pitch: -14, autoRotate: 14 });
  const { app, stage } = rig;

  // A soft mottled mask: opaque islands fading to nothing.
  const mask = rig.own(scalarMap(stage.device, (u, v) => Math.min(1, Math.max(0, (tileNoise(u, v, 4) - 0.3) * 3)), 256, 'opacity-map'));
  addMesh(app, 'plane', pbrMaterial('#6d7a8c', { gloss: 0.2 }), [0, -1.6, 0], 9);

  const material = pbrMaterial('#e0a040', { gloss: 0.8, opacityMap: mask, blendType: pc.BLEND_NORMAL, cull: pc.CULLFACE_NONE });
  addMesh(app, 'sphere', material, [-1.5, 0, 0], 2.6);
  addMesh(app, 'cylinder', material, [1.6, 0, 0], [2, 2.6, 2]);

  const setMode = (mode: (typeof MODES)[number]): void => {
    const cut = mode !== 'blend';
    material.blendType = cut ? pc.BLEND_NONE : pc.BLEND_NORMAL;
    material.alphaTest = cut ? 0.5 : 0;
    material.update();
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('transparency', MODES, 'blend', setMode);
    panel.select('opacityMapChannel', ['r', 'g', 'b'], 'g', (c) => {
      material.opacityMapChannel = c;
      material.update();
    });
    panel.slider('opacity', 0, 1, 0.01, 1, (v) => {
      material.opacity = v;
      material.update();
    });
    panel.check('opacityMap', true, (on) => {
      material.opacityMap = on ? mask : null;
      material.update();
    });
  }
  return () => rig.dispose();
};

export default mount;
