// d2 example: Globs that create or style connections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs that create or style connections',
  summary:
    'A glob can be one end or both ends of a connection. `* -> *` connects every shape to every other and leaves self-connections out; `(lady* -> barbie)[*]` addresses existing connections to style them.',
  section: 'Globs',
  tags: ['globs', 'connection', 'elk'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-connections.d2', 'repo/static/d2/globs-indexed-connections.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
