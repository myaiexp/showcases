// tanstack-charts example: Facet columns, gap and labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Facet columns, gap and labels",
  summary:
    "facet groups four regions of rows and builds one child chart spec per group. columns, gap and label control the grid: the number of columns is clamped to the group count, the gap is in pixels, and labels can be default, formatted or off. Outer axes appear once on the first column and last row.",
  section: "Text, Frame, and Facet",
  tags: ['facet', 'by', 'columns', 'gap', 'label', 'chart'],
  docs: ['repo/docs/reference/marks/text-frame-and-facet.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
