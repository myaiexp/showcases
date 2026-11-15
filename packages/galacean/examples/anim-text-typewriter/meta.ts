// galacean example: Animation: typewriter text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: typewriter text",
  summary:
    "An AnimationStringCurve on TextRenderer.text swaps the string at each key, with an AnimationColorCurve on color tinting it in the same clip.",
  section: "Animation",
  tags: ['AnimationStringCurve','AnimationColorCurve','TextRenderer'],
  docs: [
    'repo/docs/en/animation/examples/text-animation.mdx',
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
