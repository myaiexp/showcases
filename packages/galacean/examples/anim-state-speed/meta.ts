// galacean example: Animation: AnimatorState speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: AnimatorState speed",
  summary:
    "findAnimatorState returns the Walk state; its own speed slows or freezes just that state while Animator.speed stays at 1.",
  section: "Animation",
  tags: ['AnimatorState','speed','findAnimatorState'],
  docs: [
    'repo/docs/en/animation/animator.mdx',
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
