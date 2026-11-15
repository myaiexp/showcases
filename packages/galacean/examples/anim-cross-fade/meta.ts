// galacean example: Animation: crossFade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: crossFade",
  summary:
    "animator.crossFade(state, normalizedDuration) blends the current pose into Idle, Walk or Run over a fraction of the next clip; the full view has a duration slider.",
  section: "Animation",
  tags: ['Animator','crossFade'],
  docs: [
    'repo/docs/en/animation/animator.mdx',
    'repo/docs/en/animation/examples/crossFade.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
