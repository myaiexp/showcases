// The AnimatorController the loader builds for a glTF: one layer, one state per clip
import { Animator } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { steps } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, buttons, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, root, gltf, model } = r;
  const animator = model.getComponent(Animator)!;
  const controller = gltf.animatorController!;
  const states = controller.layers[0]!.stateMachine.states;
  const info = panel(stage);
  const play = (name: string): void => {
    animator.play(name);
    info.text(`glTF.animatorController\nlayers ${controller.layers.length}, states: ${states.map((s) => s.name).join(', ')}\nplaying "${name}"`);
  };
  play(states[0]!.name);
  if (stage.preview) steps(root, 1.8, states.length, (i) => play(states[i]!.name));
  else buttons(stage, states.map((s) => s.name), play);
  return stage.dispose;
};

export default mount;
