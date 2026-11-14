// Papa Parse example: Papa.unparse quotes only chosen columns
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quote chosen columns',
  summary:
    'An array of true/false values decides column by column which ones get quote marks, handy for codes like 00417 that a spreadsheet would turn into plain numbers.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'quotes', 'array of booleans'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
