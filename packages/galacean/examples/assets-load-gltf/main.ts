// A glTF built in code and loaded as AssetType.GLTF; instantiateSceneRoot makes copies of its scene
import { AssetType, type GLTFResource } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeGltfUrl, releaseUrls } from '../../shared/assets-kit.ts';
import { button } from '../../shared/controls.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import type { Entity } from '@galacean/engine';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'One load, as many instances as you like.' });
  const { engine, root, scene } = stage;
  stage.own(releaseUrls);
  lit(stage, [0, 2, 8]);
  scene.ambientLight = await loadStudioEnv(engine);
  const info = panel(stage, 'bl');
  const gltf = await engine.resourceManager.load<GLTFResource>({ type: AssetType.GLTF, url: cubeGltfUrl([0.9, 0.45, 0.2]) });
  if (ctx.signal.aborted) return stage.dispose;
  const copies: Entity[] = [];
  const add = (): void => {
    const copy = gltf.instantiateSceneRoot();
    const n = copies.length;
    copy.transform.setPosition(((n % 5) - 2) * 1.7, Math.floor(n / 5) * 1.5 - 0.5, 0);
    copy.transform.setScale(1.1, 1.1, 1.1);
    root.addChild(copy);
    copies.push(copy);
  };
  const reset = (): void => {
    for (const c of copies.splice(0)) c.destroy();
  };
  add();
  if (!stage.preview) {
    button(stage.bar, 'instantiateSceneRoot()', add);
    button(stage.bar, 'Clear', reset);
  }
  let last = 0;
  tick(root, (dt, t) => {
    if (stage.preview && t - last > 0.7) {
      last = t;
      if (copies.length >= 8) reset();
      else add();
    }
    for (const c of copies) c.transform.rotate(20 * dt, 45 * dt, 0);
    info.text(`load({ type: AssetType.GLTF, url })\ninstances ${copies.length}\nmeshes ${gltf.meshes?.length ?? 0}, materials ${gltf.materials?.length ?? 0}`);
  });
  return stage.dispose;
};

export default mount;
