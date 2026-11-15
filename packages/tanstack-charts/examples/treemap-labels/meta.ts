// tanstack-charts example: In-cell labels that fit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "In-cell labels that fit",
  summary:
    "Each leaf has a function-level label with its size. A label is drawn only when its measured text plus labelPadding fits inside the painted cell, so raising the padding or the font size removes labels from the small tiles.",
  section: "Treemap Mark",
  tags: ['treemap', 'label', 'labelFill', 'labelFontSize', 'labelFontWeight', 'labelPadding'],
  docs: ['repo/docs/reference/marks/treemap.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
