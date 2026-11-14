// Fuse.js example: the [start, end] pairs Fuse returns, turned into highlighted letters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'From match positions to highlights',
  summary:
    'With includeMatches, every result says exactly which letters matched, as [start, end] pairs. Each pair here is drawn as a bracket under the title it marks, so you can see how the numbers become the highlighted letters (the end is included).',
  section: 'Articles',
  tags: ['includeMatches', 'matches', 'indices', 'highlight'],
  docs: ['repo/docs/articles/using-fuse-with-react.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
