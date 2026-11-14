// observable-plot example: Scales: piecewise domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: piecewise domain',
  summary:
    'A linear x scale with three domain values: the default range is split into equal segments, so the dots spread unevenly across the numbers.',
  section: 'Scales',
  tags: ['domain', 'linear', 'ticks'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
