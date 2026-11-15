// tanstack-charts example: Responsive definition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Responsive definition',
  summary:
    'A definition built from a function of the surface width. Narrow the container with the slider: below 420px the axis loses its title and uses fewer ticks.',
  section: 'Chart Definitions',
  tags: ['defineChart', 'chart builder', 'width', 'axis.ticks.count', 'barX'],
  docs: ['repo/docs/concepts/chart-definitions.md', 'repo/docs/reference/chart-definitions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
