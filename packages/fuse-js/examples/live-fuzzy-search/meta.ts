// Fuse.js example: a book search that still finds what you meant when you mistype
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search that forgives typos',
  summary:
    'Type "jon", "javscript" or "gatsbi" into a book search: Fuse.js still finds John Scalzi, JavaScript and The Great Gatsby, ranks the closest first and marks the letters that matched.',
  section: 'Getting Started',
  tags: ['new Fuse', 'search', 'keys', 'includeMatches', 'includeScore', 'typos'],
  docs: ['repo/docs/getting-started.md', 'repo/docs/index.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
