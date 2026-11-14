// Papa Parse example: Papa.unparse with a chosen line ending
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line endings and file size',
  summary:
    'Papa.unparse ends each line with two characters (a carriage return and a line feed) unless you say otherwise. Switch to a single line feed and the same file gets a little smaller.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'newline'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
