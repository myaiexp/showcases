// galacean example: Animation: WrapMode Once and Loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: WrapMode Once and Loop",
  summary:
    "A state's wrapMode decides whether the Wave clip repeats or holds its last frame; the default for a new state is Loop.",
  section: "Animation",
  tags: ['AnimatorState','WrapMode','findAnimatorState'],
  docs: [
    'repo/docs/en/animation/animator.mdx',
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
