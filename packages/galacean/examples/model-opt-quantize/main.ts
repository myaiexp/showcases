// Mesh quantization shrinks vertex data: the same sphere as floats and as normalized 16-bit integers
import { AssetType, type GLTFResource } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { blinn, demo, floor, tick } from '../../shared/gfx-kit.ts';
import { NOOP } from '../../shared/model-kit.ts';
import { quantizedGlb } from '../../shared/model-gltf.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.6, 5.5], target: [0, 1, 0] });
  floor(root, engine, 0, 14, blinn(engine, [0.3, 0.34, 0.42], 10));
  stage.scene.ambientLight = await loadStudioEnv(engine);
  const files = [quantizedGlb(false), quantizedGlb(true)];
  const sizes = files.map((f) => f.glb().byteLength);
  const urls = files.map((f) => f.url());
  stage.own(() => urls.forEach((u) => URL.revokeObjectURL(u)));
  const gltfs = await Promise.all(urls.map((url) => engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF })));
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  gltfs.forEach((g, i) => {
    const m = g.instantiateSceneRoot();
    m.transform.setPosition(i ? 1.4 : -1.4, i ? 0 : 0, 0);
    root.addChild(m);
    tick(m, (dt) => m.transform.rotate(0, 25 * dt, 0));
  });
  panel(stage).text(`float32 positions: ${(sizes[0]! / 1024).toFixed(0)} KB\nKHR_mesh_quantization: ${(sizes[1]! / 1024).toFixed(0)} KB (positions as uint16)`);
  return stage.dispose;
};

export default mount;
