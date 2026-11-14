// Chart.js example: Rings within rings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rings within rings",
  summary:
    "Each dataset on a doughnut becomes its own ring, so this year can sit outside last year and be compared slice by slice. weight changes how thick a ring is.",
  section: 'Chart types',
  tags: ['datasets','weight','doughnut','setDatasetVisibility'],
  docs: ['repo/docs/charts/doughnut.md', 'repo/docs/developers/api.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
