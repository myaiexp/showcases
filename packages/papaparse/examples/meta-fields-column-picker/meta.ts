// Papa Parse example: meta.fields builds a column picker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pick columns from meta.fields',
  summary:
    'With header: true, the result lists the column names in meta.fields. That list is all you need to build a column picker: one tick box per name, and the table shows only the ticked columns, whatever file was loaded.',
  section: 'Results',
  tags: ['meta.fields', 'header', 'ParseResult', 'meta'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
