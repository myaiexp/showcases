// The animation system's objects, from Animator down to curves
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { steps } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { camera: [-1.2, 1.7, 6.2] });
  if (!r) return NOOP;
  const { stage, root, animator } = r;
  const info = panel(stage, 'tr');
  const states = animator.animatorController.layers[0]!.stateMachine.states;
  const show = (i: number): void => {
    const state = states[i]!;
    animator.play(state.name);
    const clip = state.clip;
    const tracks = clip.curveBindings.map((b) => `${b.relativePath || '.'}.${b.property}`).slice(0, 4).join(', ');
    info.text(
      `Animator\n AnimatorController: ${animator.animatorController.layers.length} layer\n  layer "${animator.animatorController.layers[0]!.name}", ${states.length} states\n   AnimatorState "${state.name}" (speed ${state.speed})\n    AnimationClip ${clip.length.toFixed(1)} s\n     ${clip.curveBindings.length} AnimationCurves:\n     ${tracks}${clip.curveBindings.length > 4 ? ' ...' : ''}`,
    );
  };
  steps(root, 2.2, states.length, show);
  return stage.dispose;
};

export default mount;
