// Chart.js example: Slice borders: center or inner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Slice borders: center or inner",
  summary:
    "With borderAlign 'center' neighbouring borders overlap on the shared edge; 'inner' keeps every border inside its own slice. A see-through border shows the difference.",
  section: 'Chart types',
  tags: ['borderAlign','borderWidth','doughnut'],
  docs: ['repo/docs/charts/doughnut.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
