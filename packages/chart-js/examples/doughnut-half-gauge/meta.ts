// Chart.js example: A half doughnut as a gauge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A half doughnut as a gauge",
  summary:
    "Rotate a doughnut to -90 degrees and limit its circumference to 180 to get a half circle, then fill it with the share reached. A small inline plugin writes the number in the middle.",
  section: 'Chart types',
  tags: ['rotation','circumference','doughnut','plugin'],
  docs: ['repo/docs/charts/doughnut.md', 'repo/docs/developers/plugins.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
