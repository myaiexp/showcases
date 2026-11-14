// observable-plot example: Scales: part of a color scheme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: part of a color scheme',
  summary:
    'Setting the color scale range to a subset of [0, 1] keeps only that part of a continuous scheme, such as the first half of rainbow.',
  section: 'Scales',
  tags: ['color', 'range', 'scheme'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
