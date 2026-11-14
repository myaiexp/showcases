// Fuse.js example: ranked results versus results in the original order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ranked, or in shelf order',
  summary:
    'By default Fuse.js puts the best match first. Turn shouldSort off and the same matches come back in the order of your original list, scores unchanged, which suits lists that already have a meaningful order.',
  section: 'Keys and results',
  tags: ['shouldSort', 'includeScore', 'keys'],
  docs: ['repo/src/types.ts', 'repo/src/core/config.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
