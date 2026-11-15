// galacean example: Animation: pause, stop and resume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: pause, stop and resume",
  summary:
    "Setting Animator.speed to 0 pauses the pose, Animator.enabled = false stops it, and restoring either resumes the Run clip.",
  section: "Animation",
  tags: ['Animator','speed','enabled'],
  docs: [
    'repo/docs/en/animation/animator.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
