// Papa Parse example: which values Papa.unparse wraps in quotes by itself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic quoting',
  summary:
    'Papa.unparse quotes only the values that would break the file: ones with a comma, a quote mark, a line break, or a space at either end. Everything else stays plain.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'quotes', 'escaping', 'RFC 4180'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
