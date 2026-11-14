// Papa Parse example: the header option, rows by position versus rows by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'First row as column names',
  summary:
    'By default every row is a list and the first line is just another row. With header: true Papa reads the first line as names and gives you one object per row, so you ask for row.city instead of row[1].',
  section: 'Parse config',
  tags: ['header', 'meta.fields'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
