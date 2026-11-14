// Papa Parse example: splitting on commas versus Papa.parse, side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Why not just split on commas?',
  summary:
    '"Isn\'t parsing CSV just String.split(\',\')?" The docs say: heavens, no. The same text read both ways: splitting tears quoted values apart and shifts every column after them; Papa keeps each row whole.',
  section: 'Convert CSV to JSON',
  tags: ['Papa.parse', 'quotes', 'split', 'RFC 4180'],
  docs: ['repo/docs/index.html', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
