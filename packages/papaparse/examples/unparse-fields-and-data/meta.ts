// Papa Parse example: Papa.unparse with explicit fields and data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Naming the header: fields and data',
  summary:
    'Rows of bare values have no column titles. Hand Papa.unparse an object with `fields` (the titles) and `data` (the rows) and the header line is written for you.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'fields', 'data', 'header'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
