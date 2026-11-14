// Papa Parse example: Papa.BYTE_ORDER_MARK, the invisible mark at the start of an Excel export
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The invisible mark Excel adds',
  summary:
    'Some files start with a byte order mark, the invisible character Papa.BYTE_ORDER_MARK. Split the text yourself and the first column is called "BOMname", so row.name finds nothing. Papa strips the mark, so the column is just "name".',
  section: 'Extras',
  tags: ['Papa.BYTE_ORDER_MARK', 'header', 'byte order mark'],
  docs: ['repo/docs/docs.html', 'repo/CHANGELOG.md', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
