// observable-plot example: Interactions: re-render on input
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interactions: re-render on input',
  summary:
    'Plot re-renders rather than updating: a sport select and a bin slider each build a new histogram plot.',
  section: 'Interactions',
  tags: ['rectY', 'binX', 'thresholds', 'filter'],
  docs: ['repo/docs/features/interactions.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
