// galacean example: Animation: culling mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: culling mode",
  summary:
    "A robot walks out of view and back with Animator.cullingMode set to None or Complete; Complete skips the evaluation while hidden.",
  section: "Animation",
  tags: ['Animator','cullingMode','AnimatorCullingMode'],
  docs: [
    'repo/docs/en/animation/animator.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
