// Papa Parse example: Papa.RECORD_SEP and Papa.UNIT_SEP as invisible delimiters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Record and unit separators',
  summary:
    'Papa.RECORD_SEP and Papa.UNIT_SEP are invisible characters made for separating data, "the true delimiter" the docs say we strangely replace with commas and tabs. Write rows with one and notes full of commas, tabs and quotes need almost no quoting, and read back unchanged.',
  section: 'Extras',
  tags: ['Papa.RECORD_SEP', 'Papa.UNIT_SEP', 'Papa.unparse', 'delimiter', 'delimiter detection'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
