// Perspective example: position-based window aggregates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Diff, lag, lead and row number windows',
  summary: 'Frame-independent window aggregates computed from row positions within each Region: the change from the previous order, the value offset rows behind or ahead, and a 1-based row number.',
  section: 'Window Columns',
  tags: ['windows', 'diff', 'lag', 'lead', 'row_number', 'offset', 'partition_by'],
  docs: ['repo/docs/md/explanation/view/config/windows.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
