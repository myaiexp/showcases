// Fuse.js example: the full and the basic build compared on four kinds of search
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The small build and the full build',
  summary:
    'Fuse.js ships a full build and a smaller basic one. Both do fuzzy search; the basic build throws "not available" for extended, token and logical searches. The docs also describe adding them back with Fuse.use, but 7.5.0 does not export ExtendedSearch, so that step is not shown here.',
  section: 'Getting Started',
  tags: ['fuse.js/basic', 'useExtendedSearch', 'useTokenSearch', 'logical query', 'builds'],
  docs: ['repo/docs/getting-started.md', 'repo/README.md', 'repo/docs/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
