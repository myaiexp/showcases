// Papa Parse example: the CSV traps that break naive readers, parsed right
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Messy CSV, parsed right',
  summary:
    'Four traps that break a home-made CSV reader: a comma inside an address, a line break inside a note, quote marks inside a title, and semicolons instead of commas. Papa Parse keeps each value in its own cell.',
  section: 'Convert CSV to JSON',
  tags: ['Papa.parse', 'quotes', 'line breaks', 'delimiter detection', 'RFC 4180'],
  docs: ['repo/README.md', 'repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-06-14',
});
