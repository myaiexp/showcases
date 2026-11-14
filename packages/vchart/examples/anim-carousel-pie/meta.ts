// vchart example: Normal animation: a pie carousel with two timelines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Normal animation: a pie carousel with two timelines",
  summary:
    "A pie's animationNormal holds two timelines that run in parallel: one dims every slice once, the other loops, lifting each slice's outerRadius by 10 and lighting it up in turn.",
  section: 'Animation',
  tags: ['animationNormal', 'timeline', 'outerRadius', 'channel', 'loop', 'oneByOne'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Cases.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
