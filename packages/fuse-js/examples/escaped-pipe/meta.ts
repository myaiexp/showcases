// Fuse.js example: an escaped pipe in an extended search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Searching for a pipe character',
  summary:
    'A bar normally splits an extended search into "or" groups, which is a problem when you are looking for shell commands like "ps | grep". Put a backslash in front of the bar and it is just a letter.',
  section: 'Extended Search',
  tags: ['useExtendedSearch', '\\|', 'OR', "'", '!', 'includeMatches'],
  docs: ['repo/docs/extended-search.md', 'repo/CHANGELOG.md', 'repo/src/search/extended/parseQuery.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
