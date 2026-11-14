// vchart example: Custom layout: a small-multiples matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom layout: a small-multiples matrix",
  summary:
    "A custom layout function places six pie regions in a matrix of rows and columns that follows the chart's size. The column count is a slider; each cell is positioned with setLayoutStartPosition and sized with setLayoutRect from chartLayoutRect.",
  section: 'Layout',
  tags: ['layout', 'chartLayoutRect', 'setLayoutStartPosition', 'setLayoutRect', 'updateLayoutAttribute'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_layout.md',
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Cases/example-custom.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
