// Papa Parse example: Papa.unparse with a function choosing what to quote
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quote by rule: a function',
  summary:
    'Instead of all or nothing, hand Papa.unparse a small function. It sees each value and its column and answers yes or no: quote the text, or only the first column, or anything long.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'quotes', 'function'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
