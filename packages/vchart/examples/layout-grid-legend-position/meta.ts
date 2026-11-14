// vchart example: Grid layout: moving and spanning a component
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grid layout: moving and spanning a component",
  summary:
    "In a grid layout a component goes wherever its element says. Selects move the legend between the first and last row and between one column and a full-width span, and put the left axis in column 0 or 2; the chart is rebuilt with the new layout.elements.",
  section: 'Layout',
  tags: ['layout.elements', 'row', 'col', 'colSpan', 'legend'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Strategy.md',
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Cases/example-grid.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
