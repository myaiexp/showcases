// vchart example: Appear presets on a bar series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Appear presets on a bar series",
  summary:
    "A bar series ships three entrance presets, chosen with animationAppear.preset: grow (the default), fadeIn and scaleIn. The chart is rebuilt on a loop so each preset can be watched in turn.",
  section: 'Animation',
  tags: ['animationAppear', 'preset', 'grow', 'fadeIn', 'scaleIn'],
  docs: [
    'repo/docs/assets/option/en/animate/animation.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
