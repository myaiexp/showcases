// Chart.js example: Bubble chart: three numbers per point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bubble chart: three numbers per point",
  summary:
    "A bubble chart gives each point three numbers: x, y and r. Here cities are placed by income and rent and sized by population. r is raw pixels, so the code converts population itself.",
  section: 'Chart types',
  tags: ['bubble','x','y','r'],
  docs: ['repo/docs/charts/bubble.md', 'repo/docs/axes/labelling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
