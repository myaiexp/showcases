// glTF morph targets become BlendShapes: SkinnedMeshRenderer.blendShapeWeights mixes them
import { Animator, type ModelMesh, SkinnedMeshRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { blobGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, blobGlb, { camera: [0, 1.5, 5], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  model.transform.setPosition(0, 1.2, 0);
  model.getComponent(Animator)!.enabled = false;
  const skinned = model.getComponentsIncludeChildren(SkinnedMeshRenderer, [])[0]!;
  const names = (skinned.mesh as ModelMesh).blendShapes.map((b) => b.name);
  const info = panel(stage);
  const weights = skinned.blendShapeWeights;
  const set = (i: number, w: number): void => {
    weights[i] = w;
    skinned.blendShapeWeights = weights;
  };
  if (!stage.preview) names.forEach((n, i) => slider(stage.bar, n, 0, 1, 0.01, 0, (v) => set(i, v)));
  tick(model, (dt, t) => {
    model.transform.rotate(0, 25 * dt, 0);
    if (stage.preview) {
      set(0, 0.5 - 0.5 * Math.cos(t * 1.5));
      set(1, 0.5 - 0.5 * Math.cos(t * 1.5 + 2.2));
    }
    info.text(names.map((n, i) => `${n} ${weights[i]!.toFixed(2)}`).join('\n'));
  });
  return stage.dispose;
};

export default mount;
