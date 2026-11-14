// vchart example: Grid layout: spans across regions and axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid layout: spans across regions and axes",
  summary:
    "layout.type grid places every layout element on a row and column grid. A pie region spans both columns of the second row, a left axis and a line region share the third row and the legend spans the first row; each element is listed in layout.elements with col, row, colSpan and rowSpan.",
  section: 'Layout',
  tags: ['layout.type', 'layout.elements', 'modelId', 'col', 'row', 'colSpan', 'rowSpan', 'region'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Strategy.md',
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Cases/example-grid.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
