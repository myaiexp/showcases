// galacean example: Animation: evaluate a curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: evaluate a curve",
  summary:
    "AnimationCurve.evaluate(time) samples a CubicSpine float curve directly; a script moves the cube with it and plots the curve and the current sample.",
  section: "Animation",
  tags: ['AnimationCurve','evaluate','Keyframe','InterpolationType'],
  docs: [
    'repo/docs/en/animation/system.mdx',
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
