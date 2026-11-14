// vchart example: Continuous player on a timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous player on a timeline',
  summary:
    'A Player of type continuous plays the scatter frames over totalDuration (which replaces interval) in the default or reverse direction. The size of the circles is the population, and the dots glide between frames.',
  section: 'Concepts: Components',
  tags: ['player', 'type: continuous', 'totalDuration', 'direction'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Player.md',
    'repo/docs/assets/option/en/component/player.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
