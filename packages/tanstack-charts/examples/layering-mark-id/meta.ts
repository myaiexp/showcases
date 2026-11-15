// tanstack-charts example: Explicit mark ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Explicit mark ids',
  summary:
    'Regional lines rendered conditionally, each with a stable mark id. Toggle regions and the remaining lines stay in place while the others animate in or out.',
  section: 'Marks and Layering',
  tags: ['id', 'lineY', 'svgAnimation'],
  docs: [
    'repo/docs/concepts/marks-and-layering.md',
    'repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
