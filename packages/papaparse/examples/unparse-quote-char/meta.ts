// Papa Parse example: Papa.unparse with a different quote character
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A different quote character',
  summary:
    "Some systems wrap values in single quotes instead of double ones. quoteChar swaps the mark, and a copy of it inside a value is doubled, as in O''Neil.",
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'quoteChar'],
  docs: ['repo/docs/docs.html', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
