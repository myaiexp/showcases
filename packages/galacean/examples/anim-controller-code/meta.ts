// galacean example: Animation: build an AnimatorController in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: build an AnimatorController in code",
  summary:
    "A new AnimatorController gets a layer, three states bound to the robot's clips and is assigned to Animator.animatorController.",
  section: "Animation",
  tags: ['AnimatorController','AnimatorControllerLayer','addLayer','addState'],
  docs: [
    'repo/docs/en/animation/animatorController.mdx',
    'repo/docs/en/animation/state-machine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
