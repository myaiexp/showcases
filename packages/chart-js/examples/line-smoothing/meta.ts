// Chart.js example: Smooth or straight lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Smooth or straight lines',
  summary:
    'A server\'s CPU load drawn straight, curved with tension, or with cubicInterpolationMode: \'monotone\', which curves without overshooting the data.',
  section: 'Chart types',
  tags: ['line', 'tension', 'cubicInterpolationMode', 'smooth'],
  docs: ['repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
