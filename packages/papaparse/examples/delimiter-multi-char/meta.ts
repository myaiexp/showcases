// Papa Parse example: a separator longer than one character
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Separators with more than one character',
  summary:
    'Some exports separate columns with "::" or "||" so that commas and semicolons can live inside the values. The delimiter option takes a string of any length.',
  section: 'Parse config',
  tags: ['delimiter', 'multi-character delimiter'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
