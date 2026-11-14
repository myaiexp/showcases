// observable-plot example: Scales: type inference
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: type inference',
  summary:
    'Plot infers a scale type from the first value: numbers are linear, strings and booleans ordinal, dates utc, and a domain of more than two values is a point scale.',
  section: 'Scales',
  tags: ['type', 'linear', 'ordinal', 'utc', 'point'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
