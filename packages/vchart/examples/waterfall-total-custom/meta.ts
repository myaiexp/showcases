// vchart example: Waterfall: custom total calculation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waterfall: custom total calculation',
  summary:
    'total.type \'custom\' calls product(datum, current) for every total row and lets you return its start and end. The sub-total here is pinned to 100 and the grand total restarts from zero to the running end.',
  section: 'Bar',
  tags: ['total.type', 'total.product', 'total.tagField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Waterfall.md',
    'repo/docs/assets/option/en/series/waterfall.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
