// A glTF Morph clip drives blend shape weights through the Animator
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { blobGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';
import { SkinnedMeshRenderer } from '@galacean/engine';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, blobGlb, { camera: [0, 1.5, 5], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, animator, model, say } = r;
  model.transform.setPosition(0, 1.2, 0);
  animator.play('Morph');
  const skinned = model.getComponentsIncludeChildren(SkinnedMeshRenderer, [])[0]!;
  tick(model, (dt) => {
    model.transform.rotate(0, 20 * dt, 0);
    say(`Morph clip -> blendShapeWeights ${Array.from(skinned.blendShapeWeights, (w) => w.toFixed(2)).join(', ')}`);
  });
  if (!stage.preview) slider(stage.bar, 'speed', 0, 3, 0.05, 1, (v) => (animator.speed = v));
  return stage.dispose;
};

export default mount;
