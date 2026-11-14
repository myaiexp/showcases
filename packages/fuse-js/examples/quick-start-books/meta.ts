// Fuse.js example: the docs' Quick Start, a small book list searched by title and author
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hello, Fuse.js',
  summary:
    'The smallest useful Fuse.js: a handful of books, two fields to look in, and one search call. "jon" finds John Scalzi, "patterns" finds JavaScript Patterns, and every hit comes with a score.',
  section: 'Getting Started',
  tags: ['new Fuse', 'search', 'keys', 'includeScore', 'includeMatches'],
  docs: ['repo/docs/getting-started.md', 'repo/README.md', 'repo/docs/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
