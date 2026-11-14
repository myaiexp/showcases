// Read as JSON example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read as JSON',
  summary:
    'Everything a server sends is text on the wire. .json() reads that text and hands you real data: objects with named parts, lists, numbers and yes/no values, laid out here next to the raw text.',
  section: 'Response types',
  tags: ['json'],
  docs: ['repo/src/types.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
