// tanstack-charts example: Easing as a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Easing as a function',
  summary:
    'easing can also be a function from normalized progress to normalized progress. This one overshoots the target and settles back, the shape of a back-out curve. The linear curve is shown beside it by alternating the two on each update.',
  section: 'Dynamic Data and Animation',
  tags: ['svgAnimation', 'easing', 'function'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
