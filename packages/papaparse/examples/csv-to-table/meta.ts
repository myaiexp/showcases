// Papa Parse example: a spreadsheet export as text becomes a typed table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CSV to table',
  summary:
    'Text exported from a spreadsheet turns into a table: the first line names the columns, and numbers and true/false come out as real values, not text. Edit it and the table follows.',
  section: 'Convert CSV to JSON',
  tags: ['Papa.parse', 'header', 'dynamicTyping', 'skipEmptyLines'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-06-14',
});
