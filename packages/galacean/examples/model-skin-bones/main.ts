// A skinned model's bones are entities: bend them from a script
import { Animator, SkinnedMeshRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { tentacleGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, tentacleGlb, { camera: [0, 2.2, 6.5], target: [0, 1.4, 0] });
  if (!r) return NOOP;
  const { stage, model, gltf } = r;
  model.getComponent(Animator)!.enabled = false;
  const renderer = model.getComponentsIncludeChildren(SkinnedMeshRenderer, [])[0]!;
  // Skin.bones lists the joint entities, ordered as in the glTF skin.
  const bones = renderer.skin.bones;
  const info = panel(stage);
  let bend = 25;
  tick(model, (_dt, t) => {
    bones.forEach((bone, i) => bone.transform.setRotation(0, 0, Math.sin(t * 1.6 - i * 0.7) * bend));
    info.text(`skins ${gltf.skins!.length}, bones ${bones.map((b) => b.name).join(' ')}\nbend ${bend.toFixed(0)} degrees per bone`);
  });
  if (!stage.preview) slider(stage.bar, 'bend', 0, 50, 1, bend, (v) => (bend = v));
  return stage.dispose;
};

export default mount;
