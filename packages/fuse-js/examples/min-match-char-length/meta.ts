// Fuse.js example: minMatchCharLength 1, 2 and 3 on the same query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'No more single-letter noise',
  summary:
    'A sloppy match can light up stray single letters all over a title. Raise minMatchCharLength and Fuse.js only marks runs of two or three letters, and drops titles whose only "match" was scattered letters.',
  section: 'Fuzzy Search',
  tags: ['minMatchCharLength', 'includeMatches', 'threshold', 'ignoreLocation'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/CHANGELOG.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
