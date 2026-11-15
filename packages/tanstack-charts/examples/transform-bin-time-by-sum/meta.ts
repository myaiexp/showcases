// tanstack-charts example: binTimeX by group with a sum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binTimeX by group with a sum",
  summary:
    "outputs and by work in calendar bins too. Orders are binned by week per region and each bin sums the amounts instead of counting rows, giving one revenue line per region over the same weeks.",
  section: "Data Transforms",
  tags: ["binTimeX", "by", "outputs", "sum", "lineY"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
