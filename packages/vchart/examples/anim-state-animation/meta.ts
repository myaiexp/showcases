// vchart example: State animation: animationState
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State animation: animationState",
  summary:
    "animationState sets the duration and easing used when a graphic changes state, here hover. The bars are hovered one by one from code with setHovered; their fill and corner radius ease into the hover style over the configured time.",
  section: 'Animation',
  tags: ['animationState', 'state.hover', 'setHovered', 'duration', 'easing'],
  docs: [
    'repo/docs/assets/option/en/animate/animation.md',
    'repo/docs/assets/option/en/animate/state-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
