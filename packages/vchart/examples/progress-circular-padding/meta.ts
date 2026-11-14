// vchart example: Circular progress innerPadding and outerPadding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Circular progress innerPadding and outerPadding",
  summary:
    "progress.style.innerPadding and outerPadding inset the fill arc from the track radially, and accept negative values to push it past the track. Two sliders move them.",
  section: "Gauge, Progress and Liquid",
  tags: ['circularProgress', 'progress.style', 'innerPadding', 'outerPadding'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/circular-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
