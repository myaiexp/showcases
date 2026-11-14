// vchart example: Discrete legend: paging many items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Discrete legend: paging many items',
  summary:
    'Twenty-four legend items on a single row: autoPage turns the overflow into pages with a pager, maxRow sets how many rows a page holds, and pager.type swaps the arrows for a scrollbar. The card flips through pages with pager.defaultCurrent.',
  section: 'Concepts: Components',
  tags: ['legends', 'autoPage', 'maxRow', 'pager', 'pager.type', 'defaultCurrent'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
