// Chart.js example: Aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Aspect ratio',
  summary:
    'In a container with no fixed height the chart takes its height from its width: maintainAspectRatio keeps width divided by height at aspectRatio. Change the ratio or the box width and the chart reshapes.',
  section: 'Configuration',
  tags: ['aspectRatio', 'maintainAspectRatio', 'responsive'],
  docs: ['repo/docs/configuration/responsive.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
