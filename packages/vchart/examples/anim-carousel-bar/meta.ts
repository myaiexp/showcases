// vchart example: Normal animation: a bar carousel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Normal animation: a bar carousel",
  summary:
    "Each bar drops away with growHeightOut and bounces back with growHeightIn, one bar after another, forever. It is one looping animationNormal timeline of two time slices with a bounceOut easing.",
  section: 'Animation',
  tags: ['animationNormal', 'growHeightOut', 'growHeightIn', 'bounceOut', 'timeSlices', 'loop'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Cases.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
