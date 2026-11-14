// observable-plot example: Scales: radius range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: radius range',
  summary:
    'The r scale is sqrt by default so dot area follows the value; an explicit range sets the largest radius.',
  section: 'Scales',
  tags: ['r', 'range', 'sqrt', 'dot'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
