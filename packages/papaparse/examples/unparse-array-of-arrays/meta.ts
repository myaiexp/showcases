// Papa Parse example: a grid of values becomes CSV text with Papa.unparse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid of values to CSV',
  summary:
    'A scoreboard held as rows of values becomes CSV text, one line per row, ready to open in a spreadsheet. Edit a score in the grid and the text follows.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'array of arrays'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
