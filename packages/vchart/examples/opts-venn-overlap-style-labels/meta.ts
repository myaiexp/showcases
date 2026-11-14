// vchart example: Venn overlap and label marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Venn overlap and label marks",
  summary: "The venn series draws two marks: circle (an arc) and overlap (a path). Here the overlap gets its own fill and stroke, and label and overlapLabel use formatMethod to show names and sizes. A select switches the overlap look.",
  section: "Option: Series",
  tags: ["venn.overlap","venn.circle","label.formatMethod","overlapLabel","state"],
  docs: [
    'repo/docs/assets/option/en/series/venn.md',
    'repo/docs/assets/option/en/chart/venn.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
