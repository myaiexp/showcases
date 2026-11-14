// Papa Parse example: escapeFormulae guards cells against spreadsheet formulas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Defusing spreadsheet formulas',
  summary:
    'A visitor types =HYPERLINK(...) into a text box and you export the list. Opened in a spreadsheet, that cell would run. With escapeFormulae, Papa puts a quote mark in front so it stays text.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'escapeFormulae', 'CSV injection'],
  docs: ['repo/docs/docs.html', 'repo/CHANGELOG.md', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
