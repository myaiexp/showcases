// Papa Parse example: Papa.unparse with quotes true wraps every value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quote every value',
  summary:
    'Some programs want every value in quote marks. Set quotes to true and Papa.unparse wraps each one, numbers and column titles included.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'quotes'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
