// vchart example: Normal animation: a looping timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Normal animation: a looping timeline",
  summary:
    "animationNormal runs while a mark is idle. This timeline has two time slices, dimming then restoring fillOpacity, with loop true and oneByOne 100, so a wave of light travels along the bars for as long as the chart is up.",
  section: 'Animation',
  tags: ['animationNormal', 'timeSlices', 'effects', 'loop', 'oneByOne', 'startTime', 'channel'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
