// Perspective example: filter operators by column type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filter operators',
  summary:
    'filter takes [column, operator, operand] triples, and the operators on offer depend on the column type: case-insensitive string matching, regular expressions, in lists, numeric comparisons and null checks.',
  section: 'Selection and Ordering',
  tags: ['filter', 'contains', 'matches', 'in', 'is null'],
  docs: ['repo/docs/md/explanation/view/config/selection_and_ordering.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
