// galacean example: Animation: a float curve on a child's light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: a float curve on a child's light",
  summary:
    "The docs' colour clip: an AnimationFloatCurve bound to color.r of a DirectLight on the child entity /light, lighting the cube from teal to white and back.",
  section: "Animation",
  tags: ['AnimationFloatCurve','addCurveBinding','DirectLight','entityPath'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
