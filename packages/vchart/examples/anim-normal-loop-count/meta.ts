// vchart example: Normal animation: loop count and startTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Normal animation: loop count and startTime",
  summary:
    "In an animationNormal timeline, loop takes true for forever or a number of repeats, and startTime delays the first run only. The full view picks the loop count; the pulsing bars stop after that many passes.",
  section: 'Animation',
  tags: ['animationNormal', 'loop', 'startTime', 'timeSlices'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
