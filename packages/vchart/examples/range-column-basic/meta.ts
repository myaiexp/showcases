// vchart example: Range column: min and max fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range column: min and max fields',
  summary:
    'A rangeColumn chart takes yField as a pair of fields, the lower and upper bound, and draws a floating bar between them. New ranges animate every couple of seconds.',
  section: 'Bar',
  tags: ['rangeColumn', 'yField', 'label'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/RangeColumn.md',
    'repo/docs/assets/option/en/series/range-column.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
