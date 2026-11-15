// A glTF's animations list: pick any clip by name and animator.play() it
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { steps } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, buttons, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, root, gltf, animator } = r;
  const info = panel(stage);
  // glTF.animations holds one AnimationClip per glTF animation; the bound controller has a state per clip.
  const { animations = [] } = gltf;
  const play = (name: string): void => {
    animator.play(name);
    const clip = animations.find((c) => c.name === name)!;
    info.text(`animator.play("${name}")\nclip length ${clip.length.toFixed(2)} s, ${clip.curveBindings.length} curves`);
  };
  play(animations[0]!.name);
  if (stage.preview) steps(root, 1.8, animations.length, (i) => play(animations[i]!.name));
  else buttons(stage, animations.map((c) => c.name), play);
  return stage.dispose;
};

export default mount;
