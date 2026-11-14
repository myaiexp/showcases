// Chart.js example: Pull a slice out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pull a slice out",
  summary:
    "offset pushes slices away from the centre and, being indexable, can take a different value per slice, so one slice stands out. hoverOffset does the same for whichever slice the pointer is on.",
  section: 'Chart types',
  tags: ['offset','hoverOffset','doughnut','indexable'],
  docs: ['repo/docs/charts/doughnut.md', 'repo/docs/general/options.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
