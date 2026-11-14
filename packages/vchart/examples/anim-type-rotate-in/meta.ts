// vchart example: Built-in type: rotateIn
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in type: rotateIn",
  summary:
    "rotateIn turns graphics that have an angle attribute; here a line's star-shaped points spin into place. options.orient sets clockwise or anticlockwise and options.angle the turn in radians.",
  section: 'Animation',
  tags: ['animationAppear', 'type', 'rotateIn', 'options.orient', 'options.angle'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
