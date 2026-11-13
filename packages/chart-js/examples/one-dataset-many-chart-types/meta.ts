// Chart.js example: the same data rendered as five chart types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One dataset, many chart types',
  summary:
    'The same numbers tell a different story depending on the chart. Switch between bar, line, radar, doughnut and polar area; bars and lines use X/Y axes, the rest are radial.',
  section: 'Basics',
  tags: ['bar', 'line', 'radar', 'doughnut', 'polarArea'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
