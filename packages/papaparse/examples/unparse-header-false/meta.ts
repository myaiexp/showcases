// Papa Parse example: Papa.unparse with header false to append rows to a file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Appending rows without a header',
  summary:
    'To add new records to a file that already has its title line, turn the header off. Otherwise the titles are written a second time in the middle of the data.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'header', 'append'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
