// vchart example: Morph animation: one bar splits into points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Morph animation: one bar splits into points",
  summary:
    "Two common charts share morphKey values: a bar averaging a group becomes that group's ten scatter points, and back (one-to-many, then many-to-one). morphKey pairs the series and morphElementKey pairs the individual graphics.",
  section: 'Animation',
  tags: ['morph.morphKey', 'morphElementKey', 'updateSpec', 'scatter', 'bar'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/option/en/common/series.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
