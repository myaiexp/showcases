// vchart example: Appear animation: totalTime with oneByOne
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Appear animation: totalTime with oneByOne",
  summary:
    "With oneByOne true, many graphics would take a long time to play. totalTime caps the whole sequence, and the per-graphic delay shrinks to fit: 40 bars finish in the same time whatever the slider says.",
  section: 'Animation',
  tags: ['animationAppear', 'oneByOne', 'totalTime', 'duration'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
