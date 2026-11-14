// vchart example: Custom states with a filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom states with a filter',
  summary:
    'A custom state name on point.state matches the marks whose datum passes a filter function, here every score at or above a threshold, and styles them red. The full view moves the threshold with updateSpec; the card sweeps it.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['point.state', 'custom state', 'filter', 'IMarkStateSpec'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Series/Mark.md', 'repo/docs/assets/option/en/common/mark-state-style.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
