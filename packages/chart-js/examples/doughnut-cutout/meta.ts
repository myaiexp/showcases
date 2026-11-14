// Chart.js example: Doughnut: how big the hole is
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Doughnut: how big the hole is",
  summary:
    "The cutout option sets how much of the middle is removed: 0 is a pie, larger values make a thinner ring. A percentage is a share of the radius; a plain number is pixels.",
  section: 'Chart types',
  tags: ['cutout','doughnut','pie'],
  docs: ['repo/docs/charts/doughnut.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
