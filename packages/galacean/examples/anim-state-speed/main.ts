// AnimatorState.speed slows one state without touching the Animator's own speed
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/anim-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  animator.play('Walk');
  const state = animator.findAnimatorState('Walk');
  const speeds = [1, 0.3, 2, 0] as const;
  cycle(stage, root, speeds.map((v) => [`state.speed = ${v}`, () => ((state.speed = v), say(`findAnimatorState("Walk").speed = ${v}\nanimator.speed = ${animator.speed}`))] as const), 1.8);
  return stage.dispose;
};

export default mount;
