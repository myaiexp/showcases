// tanstack-charts example: Leading categories plus Other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Leading categories plus Other",
  summary:
    "A table of 3,000 categories becomes the leading few bars plus one Other bar that holds the rest. Leading and remainder totals sum to the source total, which the readout checks. The slider moves the cutoff and shows how much the Other bar grows.",
  section: "Large Data",
  tags: ['barX', 'aggregation', 'Other bucket', 'scaleBand'],
  docs: [
    'repo/docs/guides/large-data.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
