// Fuse.js example: searching fields that live inside nested objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Searching inside nested records',
  summary:
    'When each book keeps its author as a small object, a dotted key such as author.country reaches inside it. Type a country and the books by authors from there light up, though the titles never mention it.',
  section: 'Keys and results',
  tags: ['keys', 'dot notation', 'author.name', 'includeMatches'],
  docs: ['repo/README.md', 'repo/src/helpers/get.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
