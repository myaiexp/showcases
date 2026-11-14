// vchart example: Morph animation: switching it off per series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Morph animation: switching it off per series",
  summary:
    "The same pie to bar switch with series.morph.enable on or off. With it on the slices become bars; with it off the old series exits and the new one enters instead.",
  section: 'Animation',
  tags: ['morph.enable', 'updateSpec', 'animationEnter', 'animationExit'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/option/en/common/series.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
