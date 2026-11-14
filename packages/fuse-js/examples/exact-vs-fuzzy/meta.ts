// Fuse.js example: a plain text filter next to Fuse.js on the same mistyped queries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plain filter vs fuzzy search',
  summary:
    'The same contact list searched two ways. A plain "does the name contain this text" filter finds nothing for "jonatan" or "mikko virtanan"; Fuse.js finds the person anyway and puts the best guess first.',
  section: 'Getting Started',
  tags: ['new Fuse', 'search', 'keys', 'threshold', 'typos'],
  docs: ['repo/docs/getting-started.md', 'repo/docs/articles/vs-semantic-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
