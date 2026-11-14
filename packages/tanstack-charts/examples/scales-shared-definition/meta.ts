// tanstack-charts example: One definition, two sizes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One definition, two sizes',
  summary:
    'The same module-level definition mounted in two hosts of different size. Each host copies the scales and assigns its own pixel range, so neither affects the other.',
  section: 'Scales',
  tags: ['defineChart', 'scaleUtc', 'mountChart'],
  docs: ['repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
