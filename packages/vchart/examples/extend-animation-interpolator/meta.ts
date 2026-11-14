// vchart example: Custom animation: a channel interpolator function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom animation: a channel interpolator function",
  summary:
    "animationUpdate with a custom function replaces the default interpolation of the listed channels. This one writes nextAttributes.y itself with a damped spring, so bars overshoot their new height and settle; a slider sets how many wobbles.",
  section: 'Custom Extension',
  tags: ['custom', 'IAnimationChannelInterpolator', 'nextAttributes', 'customParameters', 'animationUpdate', 'channel'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_animation.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
