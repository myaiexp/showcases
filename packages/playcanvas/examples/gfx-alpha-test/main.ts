// Alpha test: a threshold on opacity gives order-free cutouts, unlike blending
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { scalarMap, tileNoise } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 8.5, pitch: -14, autoRotate: 16, target: new pc.Vec3(0, 0.6, 0) });
  const { app, stage } = rig;

  // A leafy cut: a soft disc with a ragged edge. Opacity runs smoothly from 0 to 1.
  const leaf = rig.own(
    scalarMap(stage.device, (u, v) => {
      const r = Math.hypot(u - 0.5, v - 0.5) * 2 + (tileNoise(u, v, 6) - 0.5) * 0.5;
      return Math.min(1, Math.max(0, (1 - r) * 3));
    }, 128, 'leaf-opacity'),
  );
  const make = (blend: boolean): pc.StandardMaterial =>
    pbrMaterial('#5d9c3f', { opacityMap: leaf, cull: pc.CULLFACE_NONE, blendType: blend ? pc.BLEND_NORMAL : pc.BLEND_NONE, alphaTest: blend ? 0 : 0.5, gloss: 0.3 });
  const tested = make(false);
  const blended = make(true);

  // Three crossing cards on each side: they intersect, which blending cannot sort.
  const cluster = (x: number, material: pc.StandardMaterial): void => {
    for (let i = 0; i < 3; i++) addMesh(app, 'plane', material, [x, 0.6, 0], 2.6).setLocalEulerAngles(90, i * 60, 0);
  };
  cluster(-1.8, tested);
  cluster(1.8, blended);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('alphaTest (left cluster)', 0, 1, 0.01, 0.5, (v) => {
      tested.alphaTest = v;
      tested.update();
    });
    panel.check('left uses alphaTest (else blend)', true, (on) => {
      tested.blendType = on ? pc.BLEND_NONE : pc.BLEND_NORMAL;
      tested.alphaTest = on ? 0.5 : 0;
      tested.update();
    });
    panel.readout('left: alphaTest, opaque pass, no sorting. right: BLEND_NORMAL, card order matters');
  }
  return () => rig.dispose();
};

export default mount;
