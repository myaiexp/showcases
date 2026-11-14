// Papa Parse example: Papa.unparse with a backslash as the escape character
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Escaping quotes with a backslash',
  summary:
    'A quote mark inside a value, like 24" for inches, has to be marked. The default is to double it; escapeChar lets you use a backslash, or any other character, instead.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'escapeChar', 'quoteChar'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
