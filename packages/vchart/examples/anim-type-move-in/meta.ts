// vchart example: Built-in type: moveIn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in type: moveIn",
  summary:
    "moveIn slides graphics from an offset to their place. Its options choose the direction (x or y), the orient (positive or negative) and the offset in pixels, so the bars can arrive from any side.",
  section: 'Animation',
  tags: ['animationAppear', 'type', 'moveIn', 'options.direction', 'options.orient', 'options.offset'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
