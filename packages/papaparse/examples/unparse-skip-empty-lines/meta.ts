// Papa Parse example: Papa.unparse skipping empty and whitespace-only rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skipping empty rows',
  summary:
    'Rows with nothing in them become junk lines in the file. skipEmptyLines drops the empty ones, and the stricter "greedy" setting drops rows holding only spaces too.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'skipEmptyLines', 'greedy'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
