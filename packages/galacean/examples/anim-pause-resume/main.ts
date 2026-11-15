// Pause with speed = 0 or stop with enabled = false, then resume both
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/anim-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  animator.play('Run');
  const items = [
    ['Resume', () => ((animator.enabled = true), (animator.speed = 1), say('speed = 1, enabled = true: playing'))],
    ['Pause (speed = 0)', () => ((animator.speed = 0), say('animator.speed = 0: paused, still enabled'))],
    ['Resume speed', () => ((animator.speed = 1), say('animator.speed = 1: resumes from the pose'))],
    ['Stop (enabled = false)', () => ((animator.enabled = false), say('animator.enabled = false: stopped'))],
  ] as const;
  cycle(stage, root, items, 1.6);
  return stage.dispose;
};

export default mount;
