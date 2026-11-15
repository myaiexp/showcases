// A glTF with several scenes: instantiateSceneRoot(index) picks which one to place
import { AssetType, type Entity, type GLTFResource } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { blinn, demo, floor, steps, tick } from '../../shared/gfx-kit.ts';
import { NOOP, buttons } from '../../shared/model-kit.ts';
import { scenesGlb } from '../../shared/model-gltf.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.8, 5], target: [0, 1, 0] });
  floor(root, engine, 0, 12, blinn(engine, [0.3, 0.34, 0.42], 10));
  stage.scene.ambientLight = await loadStudioEnv(engine);
  const url = scenesGlb().url();
  stage.own(() => URL.revokeObjectURL(url));
  const glTF = await engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF });
  if (ctx.signal.aborted) {
    stage.dispose();
    return NOOP;
  }
  const info = panel(stage);
  let current: Entity | undefined;
  const show = (index: number): void => {
    current?.destroy();
    // The default index is 0; any other scene of the file can be picked by number.
    current = glTF.instantiateSceneRoot(index);
    root.addChild(current);
    info.text(`instantiateSceneRoot(${index})\nsceneRoots: ${glTF.sceneRoots.length}, children: ${current.children.map((c) => c.name).join(', ') || current.name}`);
  };
  show(0);
  if (stage.preview) steps(root, 1.6, glTF.sceneRoots.length, show);
  else buttons(stage, ['0', '1', '2'], (n) => show(Number(n)));
  tick(root, (dt) => current?.transform.rotate(0, 40 * dt, 0));
  return stage.dispose;
};

export default mount;
