// Papa Parse example: Papa.unparse with columns to pick and order the keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choosing and ordering columns',
  summary:
    'Records often carry more than you want to export, and not every record has every key. The columns option names exactly which keys go into the file, and in what order.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'columns', 'header'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
