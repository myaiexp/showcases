// vega example: Line: Dashes and Widths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line: Dashes and Widths",
  summary:
    "Five lines, one per series, each drawn by a line mark inside a facet group. An ordinal scale hands out the dash arrays; a width and a cap signal restyle them all at once.",
  section: "Mark Types",
  tags: ['marks.line.strokeDash','marks.line.strokeWidth','marks.line.strokeCap','marks.from.facet'],
  docs: ['repo/docs/docs/marks/line.md', 'repo/docs/docs/marks/line.vg.json', 'repo/docs/docs/marks.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
