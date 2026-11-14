// Chart.js example: Radar scale range and steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Radar scale range and steps",
  summary:
    "The radar scale auto-fits to the data, which can exaggerate small differences. beginAtZero, suggestedMax and ticks.stepSize widen it and set the ring spacing.",
  section: 'Chart types',
  tags: ['beginAtZero','suggestedMax','stepSize','scales.r','radar'],
  docs: ['repo/docs/charts/radar.md', 'repo/docs/axes/radial/linear.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
