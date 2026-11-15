// galacean example: Animation: share one controller
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: share one controller",
  summary:
    "Three robots take the first one's AnimatorController; the controller holds data only, so each Animator plays its own state at its own time.",
  section: "Animation",
  tags: ['AnimatorController','Animator','animatorController'],
  docs: [
    'repo/docs/en/animation/animatorController.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
