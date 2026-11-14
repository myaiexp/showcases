// Papa Parse example: Papa.unparse with semicolon, tab, pipe or long delimiters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choosing the delimiter',
  summary:
    'CSV does not have to use commas. A price list with decimal commas is cleaner with semicolons; tabs and pipes work, and so does a separator of several characters.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'delimiter', 'Papa.BAD_DELIMITERS'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
