// A generated .glb loaded as AssetType.GLTF and instantiated
import { Animator, AssetType, type GLTFResource } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { blinn, demo, floor, tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.7, 6.2], target: [0, 1, 0] });
  floor(root, engine, 0, 14, blinn(engine, [0.3, 0.34, 0.42], 10));
  stage.scene.ambientLight = await loadStudioEnv(engine);
  const url = robotGlb().url();
  stage.own(() => URL.revokeObjectURL(url));
  const info = panel(stage);
  info.text('loading...');
  // The docs pass the model's URL; a blob URL of the generated .glb goes through the same loader.
  const glTF = await engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF });
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  const model = glTF.instantiateSceneRoot();
  root.addChild(model);
  model.getComponent(Animator)!.play('Walk');
  info.text(`glTF.instantiateSceneRoot()\nanimations: ${glTF.animations?.map((c) => c.name).join(', ')}`);
  tick(model, (dt) => model.transform.rotate(0, 25 * dt, 0));
  return stage.dispose;
};

export default mount;
