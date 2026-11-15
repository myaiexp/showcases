// galacean example: Animation: reuse another model's clips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: reuse another model's clips",
  summary:
    "A blue character with no clips of its own plays Walk, Run, Wave and Jump from another model's AnimatorController, since the node names match.",
  section: "Animation",
  tags: ['AnimatorController','Animator','addComponent'],
  docs: [
    'repo/docs/en/animation/animatorController.mdx',
    'repo/docs/en/animation/examples/reuseAnimation.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
