// Papa Parse example: records become CSV, the first record's keys the header
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Records to CSV',
  summary:
    'A list of contact records becomes CSV text. The first record decides the header line: its keys name the columns, and every record fills them in.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'array of objects', 'header'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
