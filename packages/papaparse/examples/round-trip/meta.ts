// Papa Parse example: parse a CSV, edit the table, unparse it back to CSV
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Round trip: parse, edit, unparse',
  summary:
    'The two halves of Papa Parse together: read a CSV into a table, change a cell, and write the table back out as CSV text. The edit is the only difference.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.parse', 'Papa.unparse', 'header', 'round trip'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
