// Papa Parse example: export a table as a downloadable .csv file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Download a table as a .csv file',
  summary:
    'The usual "Export" button: the table is turned into CSV text with Papa.unparse, wrapped as a file in the browser, and saved through a download link. Nothing is uploaded anywhere.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'Blob', 'download'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
