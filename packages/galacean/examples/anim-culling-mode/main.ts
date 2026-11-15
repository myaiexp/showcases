// Animator.cullingMode: Complete skips the work while the model is off screen, None keeps evaluating
import { AnimatorCullingMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb, { camera: [0, 1.7, 7], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, animator, model, say, root } = r;
  animator.play('Walk');
  let mode = AnimatorCullingMode.None;
  const use = (m: AnimatorCullingMode): void => {
    mode = m;
    animator.cullingMode = m;
  };
  use(AnimatorCullingMode.None);
  // The robot walks out of view and back; with Complete its pose is not evaluated while hidden.
  tick(model, (_dt, t) => {
    model.transform.setPosition(Math.sin(t * 0.8) * 7, 0, 0);
    say(`cullingMode = ${mode === AnimatorCullingMode.Complete ? 'Complete' : 'None'}`);
  });
  cycle(stage, root, [['None', () => use(AnimatorCullingMode.None)], ['Complete', () => use(AnimatorCullingMode.Complete)]], 6);
  return stage.dispose;
};

export default mount;
