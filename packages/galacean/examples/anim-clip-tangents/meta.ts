// galacean example: Animation: Hermite tangents
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: Hermite tangents",
  summary:
    "Hermite keys take inTangent and outTangent; the slider (and the card) change the slope so the same two positions ease, overshoot or dip.",
  section: "Animation",
  tags: ['Keyframe','inTangent','outTangent','InterpolationType.Hermite'],
  docs: [
    'repo/docs/en/animation/system.mdx',
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
