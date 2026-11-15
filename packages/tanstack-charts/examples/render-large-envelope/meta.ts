// tanstack-charts example: A pixel-width min and max envelope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A pixel-width min and max envelope",
  summary:
    "A 40,000-sample signal is reduced to one bucket per three pixels of chart width: each bucket keeps its minimum, maximum and first value. The responsive builder reads the width, so the bucket count follows resizing. The readout confirms every row belongs to one bucket and that the global extrema survived.",
  section: "Large Data",
  tags: ['defineChart', 'responsive builder', 'areaY', 'lineY', 'envelope'],
  docs: ['repo/docs/guides/large-data.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
