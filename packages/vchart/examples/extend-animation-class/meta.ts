// vchart example: Custom animation: your own ACustomAnimate class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom animation: your own ACustomAnimate class",
  summary:
    "A class extending ACustomAnimate, exported by VChart, is given as custom in animationAppear. Its onUpdate writes y and y1 per frame, so bars spring up from the baseline; customParameters carries the number of bounces into the class.",
  section: 'Custom Extension',
  tags: ['ACustomAnimate', 'custom', 'customParameters', 'onUpdate', 'getEndProps', 'animationAppear'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_animation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
