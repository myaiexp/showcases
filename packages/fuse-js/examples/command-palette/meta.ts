// Fuse.js example: an editor command palette where half-typed commands still run
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A command palette',
  summary:
    'The kind of search Fuse.js is made for: an editor\'s command palette. Type "tgl side" or "setings", the right command rises to the top, Enter runs it, and the little editor window changes.',
  section: 'Articles',
  tags: ['new Fuse', 'search', 'keys', 'threshold', 'includeMatches', 'limit'],
  docs: ['repo/docs/articles/vs-semantic-search.md', 'repo/docs/articles/using-fuse-with-react.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
