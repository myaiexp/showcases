// Papa Parse example: escapeFormulae with a regular expression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Defusing only some formulas',
  summary:
    'Guarding every value that starts with a minus sign also turns real negative numbers into text. Give escapeFormulae a regular expression and Papa guards only what you list.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'escapeFormulae', 'RegExp'],
  docs: ['repo/docs/docs.html', 'repo/CHANGELOG.md', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
