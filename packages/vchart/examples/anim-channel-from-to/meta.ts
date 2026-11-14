// vchart example: Visual channel animation: fillOpacity and y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Visual channel animation: fillOpacity and y",
  summary:
    "Instead of a built-in type, channel lists the visual attributes to animate with explicit from and to values. Here each bar fades from 0.1 to 1 while y starts from a function of its own datum; type and channel are mutually exclusive.",
  section: 'Animation',
  tags: ['animationAppear', 'channel', 'from', 'to', 'fillOpacity'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
