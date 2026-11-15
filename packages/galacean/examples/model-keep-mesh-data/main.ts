// The glTF load param keepMeshData keeps CPU copies of vertex data, so ModelMesh can be read back
import { AssetType, type GLTFResource, type ModelMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { blinn, demo, floor, tick } from '../../shared/gfx-kit.ts';
import { blobGlb } from '../../shared/gltf-models.ts';
import { NOOP } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.6, 6], target: [0, 1, 0] });
  floor(root, engine, 0, 14, blinn(engine, [0.3, 0.34, 0.42], 10));
  stage.scene.ambientLight = await loadStudioEnv(engine);
  const url = blobGlb().url();
  stage.own(() => URL.revokeObjectURL(url));
  // Same file twice; the second load passes params so the first Cache entry is not reused.
  const kept = await engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF, params: { keepMeshData: true } });
  const dropped = await engine.resourceManager.load<GLTFResource>({ url: `${url}#plain`, type: AssetType.GLTF });
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  const read = (g: GLTFResource): string => {
    try {
      return `${(g.meshes![0]![0] as ModelMesh).getPositions()!.length} positions readable`;
    } catch {
      return 'getPositions() refused';
    }
  };
  [kept, dropped].forEach((g, i) => {
    const m = g.instantiateSceneRoot();
    m.transform.setPosition(i ? 1.6 : -1.6, 1, 0);
    root.addChild(m);
    tick(m, (dt) => m.transform.rotate(0, 25 * dt, 0));
  });
  panel(stage).text(`left  keepMeshData: true  -> ${read(kept)}\nright default (false) -> ${read(dropped)}`);
  return stage.dispose;
};

export default mount;
