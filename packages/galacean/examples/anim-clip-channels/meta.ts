// galacean example: Animation: one curve per channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: one curve per channel",
  summary:
    "The property path reaches into a value: three float curves on color.r, color.g and color.b of a DirectLight tint the cube through a rainbow.",
  section: "Animation",
  tags: ['addCurveBinding','propertyPath','DirectLight','AnimationFloatCurve'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
