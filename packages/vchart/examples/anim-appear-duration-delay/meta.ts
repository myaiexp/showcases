// vchart example: Appear animation: duration and delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Appear animation: duration and delay",
  summary:
    "A bar chart replays its entrance animation on a loop. animationAppear.duration sets how long the bars take to grow and animationAppear.delay how long they wait before starting; the full view has a slider for each.",
  section: 'Animation',
  tags: ['animationAppear', 'duration', 'delay'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Attributes_and_Settings.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/option/en/animate/animation.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
