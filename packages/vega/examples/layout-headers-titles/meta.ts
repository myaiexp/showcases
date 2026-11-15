// vega example: Layout: Headers, Footers and Titles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout: Headers, Footers and Titles',
  summary:
    'A 3-by-2 grid of cells framed by column headers and footers, row headers and footers, and one title per axis. Groups take their grid positions from role: column-header, row-title and the rest.',
  section: 'Layout',
  tags: ['layout.offset', 'marks.group.role', 'layout.columns'],
  docs: ['repo/docs/docs/layout.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
