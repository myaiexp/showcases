// vchart example: Update animation: a racing ranking bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Update animation: a racing ranking bar",
  summary:
    "A horizontal ranking whose scores change every two seconds. animationUpdate has two entries: type update for every channel except x and y over 1200 ms, and a short 500 ms animation for the x and y position channels, so the bars slide to their new rank while the length eases. The axes animate linearly.",
  section: 'Animation',
  tags: ['animationUpdate', 'type update', 'excludeChannels', 'channel', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Cases.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Configuration_and_Choreography_of_Complex_Animations.md',
    'repo/docs/assets/option/en/animate/mark-animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
