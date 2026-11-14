// vchart example: Range column: minLabel and maxLabel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range column: minLabel and maxLabel',
  summary:
    'label.minLabel and label.maxLabel style the two ends of a range separately: they exist only with label.position bothEnd, and each has its own visibility, position, offset and formatMethod. Here the lower end is prefixed with low and the upper end carries a unit.',
  section: 'Bar',
  tags: ['label.minLabel', 'label.maxLabel', 'formatMethod', 'offset'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/RangeColumn.md',
    'repo/docs/assets/option/en/series/range-column.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
