// vchart example: Discrete player stepping through frames
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Discrete player stepping through frames',
  summary:
    'A Player of type discrete plays one frame per year: player.specs holds a data entry for each frame, auto starts it and loop repeats it, and the slider and controller sit under the chart. Interval, loop and auto change in the full view.',
  section: 'Concepts: Components',
  tags: ['player', 'specs', 'type: discrete', 'auto', 'loop', 'interval'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Player.md',
    'repo/docs/assets/option/en/component/player.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
