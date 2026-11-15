// tanstack-charts example: Bin width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bin width",
  summary:
    "binWidth is the pixel distance between bin centers. A small width gives many sparse bins, a large one few dense bins; the same 600 rows are re-binned on every change.",
  section: "Hexbin Mark",
  tags: ['hexbin', 'binWidth'],
  docs: ['repo/docs/reference/marks/hexbin.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
