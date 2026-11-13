// Perspective example: a rows-framed moving average window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Moving average window',
  summary: 'A window column averages each row with the N rows before it, ordered by Order Date. Bigger frames smooth the line; the sort keeps the chart in date order.',
  section: 'Window Columns',
  tags: ['windows', 'rows', 'avg', 'order_by', 'Y Line'],
  docs: ['repo/docs/md/explanation/view/config/windows.md', 'repo/docs/md/explanation/view/config/selection_and_ordering.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
