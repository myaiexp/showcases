// vchart example: Range column: label position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range column: label position',
  summary:
    'On a horizontal rangeColumn, label.position places the value labels in the middle, at the start, at the end or at both ends of each range. A select switches between the four.',
  section: 'Bar',
  tags: ['label.position', 'direction', 'xField', 'rangeColumn'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/RangeColumn.md',
    'repo/docs/assets/option/en/series/range-column.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
