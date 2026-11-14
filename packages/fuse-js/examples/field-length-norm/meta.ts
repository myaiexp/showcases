// Fuse.js example: the same word in short and long titles, scored
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Short titles win',
  summary:
    'The word "pasta" is spelled perfectly in every title here, yet Fuse.js ranks the one-word title first and the thirteen-word one last. Shorter fields score better: a hit in a short title says more than a hit buried in a long one.',
  section: 'Fuzzy Search',
  tags: ['includeScore', 'ignoreLocation', 'keys'],
  docs: ['repo/docs/fuzzy-search.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
